import { Request, Response } from 'express';
import Container, {IContainer} from "../models/container.model";
import {Error} from "mongoose";

export const getContainers = (_: Request, res: Response) => {

    res.send([
        {
            id: 'S-001',
            latitude: 54.906646,
            longitude: 23.955046,
            level: 25
        },
        {
            id: 'S-002',
            latitude: 54.914361,
            longitude: 23.944826,
            level: 80
        },
        {
            id: 'S-003',
            latitude: 54.900076,
            longitude: 23.927305,
            level: 60
        }
    ]);
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
            status: 0,
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
