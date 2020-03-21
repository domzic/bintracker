import { Request, Response } from 'express';
import Container from "../models/container.model";

export const getContainers = async (req: Request, res: Response) => {
    const containers = await Container.find({ company: req.user!!.company});

    if (!containers) {
        res.sendStatus(500);
    }

    res.send(containers);
};

export const addContainer = async (req: Request, res: Response) => {
    const { formData } = req.body;

    if (!formData) {
        res.sendStatus(500);
    }

    const {latitude, longitude, ttnDeviceId} = formData;

    try {
        const container = await Container.create({
            latitude,
            longitude,
            ttnDeviceId,
            level: 0,
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
