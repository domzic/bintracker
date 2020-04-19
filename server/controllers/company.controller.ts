import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { Error, mongo } from 'mongoose';
import * as mongoose from 'mongoose';
import User, { IUser } from '../models/user.model';
import Company, { ICompany } from '../models/company.model';

import Stat, { IStat, StatType } from '../models/stat.model';

export const createCompany = async (req: Request, res: Response) => {
    const { emailsString, name, admin, ttnAppName } = req.body.formData;
    let company: ICompany = new Company({ name, ttnAppName });
    let employees: IUser[] = [];
    employees.push(new User({ email: admin, company, isAdmin: true, confirmed: false }));
    if (emailsString) {
        const emails: string[] = emailsString.split(',').map((email: string) => email.trim());
        employees = employees.concat(emails.map(employee => new User({
            email: employee,
            company,
            isAdmin: false,
            confirmed: false
        })));
    }

    const existingName = await Company.existsByName(name);
    if (existingName) {
        return res.status(422).send(['name']);
    }

    const existingUser = await User.existsByEmail(admin);
    if (existingUser) {
        return res.status(422).send(['admin']);
    }

    const existingTTNApp = await Company.existsByTTNName(ttnAppName);
    if (existingTTNApp) {
        return res.status(422).send(['ttnAppName']);
    }

    if (emailsString) {
        const invalidEmails = await Promise.all(employees.map(async (employee, index) => {
            if (index === 0) {
                return Promise.resolve();
            }
            const existing = await User.existsByEmail(employee.email);
            if (existing) {

                return Promise.resolve(employee.email);
            } return Promise.resolve();
        }));

        if (invalidEmails.filter(email => email).length) {
            return res.status(422).send(invalidEmails.filter(email => email));
        }
    }

    const stats: IStat[] = [
        new Stat({ key: StatType.servicedContainersCount, value: 0, company }),
        new Stat({ key: StatType.notRegisteredDevices, devices: [], company })
    ];
    await Stat.insertMany(stats);

    try {
        const users = await User.insertMany(employees);
        company.employees.concat(users);
        company = await Company.create(company);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send('Oops...');
    }
};

export const updateCompany = async (req: Request, res: Response) => {
    const { ttnAppName, name } = req.body.formData;
    const company = await Company.findById(req.user!!.company).populate('employees');
    console.log('ID  ', company);
    if (!company) {
        return res.sendStatus(422);
    }

    let existing = await Company.existsByNameExcept(name, company.id);
    if (existing) {
        return res.status(422).send(['name']);
    }

    existing = await Company.existsByTTNNameExcept(ttnAppName, company.id);
    if (existing) {
        return res.status(422).send(['ttnAppName']);
    }

    company.ttnAppName = ttnAppName;
    company.name = name;

    await company.save();
    return res.status(200).send(company);
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
    const { email } = req.body.formData;

    const userExists = await User.existsByEmail(email);
    if (userExists) {
        res.status(422).send(['email']);
    }

    const company = await Company.findById(req.user!!.company).populate('employees');
    if (!company) {
        res.sendStatus(422);
    }

    const employee = await User.create({ email: email.toLowerCase(), company: req.user!!.company, isAdmin: false, confirmed: false });
    company!!.employees.push(employee);
    await company!!.save();
    res.status(200).send(company);
};
