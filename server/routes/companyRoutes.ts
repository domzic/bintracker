import passport from 'passport';
import { Application } from "express";
import { CompanyController } from '../controllers/CompanyController';
import { authenticated } from '../middlewares/authenticated';
  
export default function(app: Application) {
    const companyController = new CompanyController();

    app.route('/api/company')
        .post(authenticated, companyController.createCompany)
        .get(authenticated, companyController.getCompany);


}