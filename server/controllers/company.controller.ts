import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user.model';
import Company, { ICompany } from '../models/company.model';
import _ from 'lodash';

import { Error } from 'mongoose';

export const createCompany = async (req: Request, res: Response) => {
    const { employees, name, admin } = req.body;
    const employeeEmails: string[] = employees.split(',').map((email: string) => email.trim());
    let company: ICompany = new Company({ name, email: admin, employees: employeeEmails });
    try {
        company = await Company.create(company);
    } catch (error) {
        return res.sendStatus(500).json({ message: error.message});
    }

    const users: IUser[] = employeeEmails.map(employee => {
        return new User({ email: employee, company, isAdmin: false, confirmed: false});
    });
    users.push(new User({ email: admin, company, isAdmin: true, confirmed: false}));

    try {
        await User.insertMany(users);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            error.message = 'User with this username already exists';
        }
        return res.sendStatus(500).json({ message: error.message });
    }
};

export const getCompany = async (req: Request, res: Response) => {
    const { companyId } = req.body;
    let company: ICompany | null;
    try {
        company = await Company.findById(companyId);
        res.send(company);
    } catch (error) {
        res.sendStatus(500).json({ message: error.message })
    }
};

export const removeEmployee = async (req: Request, res: Response) => {
    const { companyId, employeeEmail } = req.body;
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            throw new Error('Internal server error');
        }
        company.employees = _.filter(company.employees, val => { return val !== employeeEmail});
        await company.save();
        await User.deleteOne({ email: employeeEmail });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).json({ message: error.message });
    }
};

export const addEmployee = async (req: Request, res: Response) => {
    const { companyId, employeeEmail } = req.body;
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            throw new Error('Internal server error');
        }
        company.employees.push(employeeEmail);
        await company.save();
        await User.create({ email: employeeEmail, company: companyId, isAdmin: false, confirmed: false});
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).json({ message: error.message });
    }
};
