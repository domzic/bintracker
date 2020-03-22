import { Request, Response } from 'express';
import Container, {IContainer} from "../models/container.model";

export const getContainers = async (req: Request, res: Response) => {
    const containers = await Container.find({ company: req.user!!.company});

    if (!containers) {
        res.sendStatus(500);
    }

    let green: IContainer[] = [];
    let yellow: IContainer[] = [];
    let red : IContainer[] = [];
    containers.map(container => {
       if (container.level < 50) {
           green.push(container);
       } else if (container.level < 80) {
           yellow.push(container);
       } else {
           red.push(container);
       }
    });

    res.json({ green, yellow, red});
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
            company: req.user!!.company
        });
        res.status(200).send(container);
    } catch (error) {
        if (error) {
            res.status(500).send('Device is already registered');
        }
    }
};
