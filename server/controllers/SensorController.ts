import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import Company, { ICompany } from '../models/Company';

import { UserService } from '../services/UserService';
import { CompanyService } from '../services/CompanyService';
import { Error } from 'mongoose';

export class SensorController {

    companyService: CompanyService = new CompanyService();
    userService: UserService = new UserService();

    constructor() {}

    public getSensors = (req: Request, res: Response, next: NextFunction) => {
        res.send([
            {
                id: 'S-001',
                lat: 54.906646,
                lng: 23.955046,
                level: 25
            },
            {
                id: 'S-002',
                lat: 54.914361,
                lng: 23.944826,
                level: 80
            },
            {
                id: 'S-003',
                lat: 54.900076,
                lng: 23.927305,
                level: 60
            }
        ]);
    }

}