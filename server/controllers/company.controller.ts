import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user.model';
import Company, { ICompany } from '../models/company.model';

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


