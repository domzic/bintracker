import { Request, Response } from 'express';
import moment from 'moment';
import _ from 'lodash';
import Container, { IContainer } from '../models/container.model';
import TTNController from './ttn.controller';
import Company from '../models/company.model';
import Stat, { Action, StatType } from '../models/stat.model';

const getContainersTypes = (containers: IContainer[]) => {
    const green: IContainer[] = [];
    const yellow: IContainer[] = [];
    const red: IContainer[] = [];
    containers = _.sortBy(containers, ['ttnDeviceId']);
    containers.map(container => {
        if (container.level < 50) {
            green.push(container);
        } else if (container.level < 80) {
            yellow.push(container);
        } else {
            red.push(container);
        }
    });

    return { green, yellow, red };
};

export const getContainers = async (req: Request, res: Response) => {
    const { company } = req.user!!;
    const companyDoc = await Company.findById(company);

    if (!companyDoc) {
        res.status(500).send('Company not found.');
    }

    if (moment.duration(moment(new Date()).diff(companyDoc!!.lastUpdate)).asHours() >= 1) {
        companyDoc!!.lastUpdate = moment().toDate();
        await companyDoc!!.save();
    }

    const containers = await Container.find({ company });

    if (!containers) {
        res.sendStatus(500);
    }

    res.json(getContainersTypes(containers));
};

export const addContainer = async (req: Request, res: Response) => {
    const { latitude, longitude, ttnDeviceId, level, address } = req.body.formData;
    const exists = await Container.companyDeviceExists(ttnDeviceId, req.user!!.company);
    if (exists) {
        return res.status(422).send(['ttnDeviceId']);
    }
    try {
        await Container.create({
            latitude,
            longitude,
            ttnDeviceId,
            address: address || '',
            level: level || -1,
            timesServiced: 0,
            height: 0,
            lastUpdate: new Date(),
            company: req.user!!.company
        });
    } catch (error) {
        res.sendStatus(422);
    }

    await Stat.create({
        key: StatType.Action,
        value: `Container ${ttnDeviceId} was added by ${req.user!!.displayName}`,
        company: req.user!!.company,
        action: Action.Add,
        date: moment()
    });

    const notRegisteredDevices = await Stat.findOne({
        company: req.user!!.company, key: StatType.notRegisteredDevices
    });

    if (notRegisteredDevices && notRegisteredDevices.devices?.includes(ttnDeviceId)) {
        notRegisteredDevices.devices = notRegisteredDevices.devices.filter(d => d !== ttnDeviceId);
        await notRegisteredDevices.save();
    }

    const containers = await Container.find({ company: req.user!!.company });
    res.status(200).send(getContainersTypes(containers));
};

export const removeContainer = async (req: Request, res: Response) => {
    const { ttnDeviceId } = req.body;

    if (!ttnDeviceId) {
        res.sendStatus(500);
    }

    try {
        await Container.deleteOne({ ttnDeviceId });
        await Stat.create({
            key: StatType.Action,
            value: `Container ${ttnDeviceId} was deleted by ${req.user!!.displayName}`,
            company: req.user!!.company,
            action: Action.Remove,
            date: moment()
        });
        const containers = await Container.find({ company: req.user!!.company });
        res.status(200).json(getContainersTypes(containers));
    } catch (error) {
        if (error) {
            console.log(error);
            res.status(500).send('Could not find that device...');
        }
    }
};

export const updateContainersData = async (req: Request, res: Response) => {
    const { company } = req.user!!;
    const companyDoc = await Company.findById(company);

    try {
        await TTNController.update(companyDoc!!);
        const containers = await Container.find({ company });

        if (!containers) {
            res.sendStatus(500);
        }

        res.status(200).json(getContainersTypes(containers));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
