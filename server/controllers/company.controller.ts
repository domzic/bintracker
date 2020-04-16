import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { Error } from 'mongoose';
import User, { IUser } from '../models/user.model';
import Company, { ICompany } from '../models/company.model';

import Stat, { IStat, StatType } from '../models/stat.model';

export const createCompany = async (req: Request, res: Response) => {
    const { emailsString, name, admin, ttnAppName } = req.body;
    const emails: string[] = emailsString.split(',').map((email: string) => email.trim());
    let company: ICompany = new Company({ name, email: admin, ttnAppName });
    try {
        company = await Company.create(company);
    } catch (error) {
        return res.sendStatus(500).json({ message: error.message });
    }

    const employees = emails.map(employee => new User({ email: employee, company, isAdmin: false, confirmed: false }));
    employees.push(new User({ email: admin, company, isAdmin: true, confirmed: false }));

    User.insertMany(employees)
        .then(employees => {
            company.employees.concat(employees);
            company.save();
        })
        .catch(error => {
            if (error instanceof Error.ValidationError) {
                error.message = 'User with this username already exists';
            }
            return res.sendStatus(500).json({ message: error.message });
        });

    const stats: IStat[] = [
        new Stat({ key: StatType.servicedContainersCount, value: 0, company }),
        new Stat({ key: StatType.notRegisteredDevices, devices: [] })
    ];

    await Stat.insertMany(stats);

    res.sendStatus(200);
};

export const getCompany = async (req: Request, res: Response) => {
    let company: ICompany | null;
    try {
        company = await Company.findById(req.user!!.company).populate('employees');
        res.send(company);
    } catch (error) {
        res.sendStatus(500).json({ message: error.message });
    }
};

export const removeEmployee = async (req: Request, res: Response) => {
    const { employeeEmail } = req.body;
    try {
        const company = await Company.findById(req.user!!.company);

        if (!company) {
            throw new Error('Internal server error');
        }

        company.employees = _.filter(company.employees, employee => employee.email !== employeeEmail);
        await company.save();
        await User.deleteOne({ email: employeeEmail });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).json({ message: error.message });
    }
};

export const addEmployee = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        console.log('email: ', email);
        const company = await Company.findById(req.user!!.company);

        if (!company) {
            throw new Error('Internal server error');
        }

        const employee = await User.create({ email: email.toLowerCase(), company: req.user!!.company, isAdmin: false, confirmed: false });
        company.employees.push(employee);
        await company.save();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).json({ message: `Email ${email} is already registered` });
    }
};
