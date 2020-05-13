import { Request, Response } from 'express';
import _ from 'lodash';
import moment from 'moment';
import Stat, { Action, StatType } from '../models/stat.model';

export const getActions = async (req: Request, res: Response) => {
    const { company } = req.user!!;
    const actions = await Stat.find({ company, key: StatType.Action }).limit(25);

    res.send(_.orderBy(actions, ['date'], ['desc']));
};

export const getMonthlyReport = async (req: Request, res: Response) => {
    const { company } = req.user!!;
    const actions = await Stat.find({ company, key: StatType.Action, action: Action.Serviced });

    const groups = _.groupBy(actions.map(action => action.date), date => moment(date).format('MMMM'));
    const reports: Report[] = [];
    Object.entries(groups).forEach(([key, value]) =>
        reports.push({ key, value: value.length }));

    const maxMonth = _.max(reports.map(reports => moment().month(reports.key).format('M'))) || 0;
    moment.months().forEach((month, index) => {
        if (reports.find(r => r.key === month) === undefined && maxMonth >= index + 1) {
            reports.push({ key: month, value: 0 });
        }
    });

    res.send(_.sortBy(reports, r => moment().month(r.key).format('M')));
};


interface Report {
    key: string;
    value: number;
}
