import { Request, Response } from 'express';
import moment from 'moment';
import Container, { IContainer } from '../models/container.model';
import TTNController from './ttn.controller';
import Company from '../models/company.model';

export const getContainers = async (req: Request, res: Response) => {
    const { company } = req.user!!;
    const companyDoc = await Company.findById(company);

    if (!companyDoc) {
        res.sendStatus(500).send('Company not found.');
    }

    if (moment.duration(moment(new Date()).diff(companyDoc!!.lastUpdate)).asHours() >= 1) {
        companyDoc!!.lastUpdate = moment().toDate();
        await companyDoc!!.save();
    }

    const containers = await Container.find({ company });

    if (!containers) {
        res.sendStatus(500);
    }

    const green: IContainer[] = [];
    const yellow: IContainer[] = [];
    const red: IContainer[] = [];
    containers.map(container => {
        if (container.level < 50) {
            green.push(container);
        } else if (container.level < 80) {
            yellow.push(container);
        } else {
            red.push(container);
        }
    });

    res.json({ green, yellow, red });
};

export const addContainer = async (req: Request, res: Response) => {
    const { formData } = req.body;

    if (!formData) {
        res.sendStatus(500);
    }

    const { latitude, longitude, ttnDeviceId, level } = formData;

    try {
        const container = await Container.create({
            latitude,
            longitude,
            ttnDeviceId,
            level: level || 0,
            timesServiced: 0,
            height: 0,
            company: req.user!!.company
        });
        res.status(200).send(container);
    } catch (error) {
        if (error) {
            res.status(500).send('Device is already registered');
        }
    }
};

export const removeContainer = async (req: Request, res: Response) => {
    const { ttnDeviceId } = req.body;

    if (!ttnDeviceId) {
        res.sendStatus(500);
    }

    try {
        await Container.deleteOne({ ttnDeviceId });
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        if (error) {
            res.status(500).send('Could not find that device...');
        }
    }
};

export const updateContainersData = async (req: Request, res: Response) => {
    const { company } = req.user!!;
    const companyDoc = await Company.findById(company);

    try {
        await TTNController.update(companyDoc!!);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).json({ message: error.message });
    }
};
