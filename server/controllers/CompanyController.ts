import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import Company, { ICompany } from '../models/Company';

import { UserService } from '../services/UserService';
import { CompanyService } from '../services/CompanyService';
import { Error } from 'mongoose';

export class CompanyController {

    companyService: CompanyService = new CompanyService();
    userService: UserService = new UserService();

    constructor() {}

    public getCompany = (req: Request, res: Response, next: NextFunction) => {}

    public createCompany = async (req: Request, res: Response, next: NextFunction) => {
        const employees: string = req.body.employees || [];
        const name: string = req.body.name || "";
        const admin: string = req.body.admin || "";
        const employeeEmails: string[] = employees.split(',').map((email: string) => email.trim());
        let company: ICompany = new Company({ name, email: admin, employees: employeeEmails });
        try {
            company = await this.companyService.create(company);
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message});
        }

        const users: IUser[] = [];
        employeeEmails.forEach(employee => {
            let user: IUser = new User({ email: employee, company: company, isAdmin: false, confirmed: false});
            users.push(user);
        });
        const adminUser: IUser = new User({ email: admin, company, isAdmin: true, confirmed: false});
        users.push(adminUser);

        this.createEmployees(users, res);
        
    }

    public getCompanyStats = (req: Request, res: Response, next: NextFunction) => {
        
    }

    private createEmployees = (users: IUser[], res: Response) => {
        try {
            this.userService.create(users);
            return res.status(200).json({ status: 200,  message: "Succesfully created company and users"});
        } catch (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
    }
}