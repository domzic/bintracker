import { Request, Response } from 'express';
import User from '../models/user.model';

export const updateUser = async (req: Request, res: Response) => {
    const { formData } = req.body;

    if (!formData) {
        res.sendStatus(500);
    }

    const { displayName, phone, position } = formData;

    const query = { email: req.user!!.email };
    const newData = { displayName, phone, position };

    try {
        await User.findOneAndUpdate(query, newData);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).json(error);
    }
};
