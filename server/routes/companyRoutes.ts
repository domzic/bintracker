import passport from 'passport';
import { Application } from "express";

import CompanyController from '../controllers/CompanyController';
  
export default function(app: Application) {
    app.post('/api/company', CompanyController.createCompany);
}