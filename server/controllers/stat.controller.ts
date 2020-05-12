import { Request, Response } from 'express';
import _ from 'lodash';
import Stat, { StatType } from '../models/stat.model';

export const getActions = async (req: Request, res: Response) => {
    const { company } = req.user!!;
    const actions = await Stat.find({ company, key: StatType.Action }).limit(25);

    res.send(_.orderBy(actions, ['date'], ['desc']));
};
