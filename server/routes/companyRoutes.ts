import passport from 'passport';
import { Application } from "express";
import { CompanyController } from '../controllers/CompanyController';
  
export default function(app: Application) {
    let companyController = new CompanyController();

    app.route('/api/company')
        .post(companyController.createCompany)
        .get(companyController.getCompany);


}