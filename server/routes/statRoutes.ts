import passport from 'passport';
import { Application } from "express";
import { CompanyController } from '../controllers/CompanyController';
import { authenticated } from '../middlewares/authenticated';
  
export default function(app: Application) {
    let companyController = new CompanyController();

    app.get('/api/stats', authenticated, companyController.getCompanyStats);

}