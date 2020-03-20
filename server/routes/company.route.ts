import express from "express";
import {
    createCompany,
    getCompany,
    addEmployee,
    removeEmployee,
    getEmployees
} from '../controllers/company.controller';
import { authenticated } from '../middlewares/authenticated';

const router = express.Router();

router.post('/', authenticated, createCompany);
router.get('/', authenticated, getCompany);
router.get('/employees', authenticated, getEmployees);
router.put('/employee', addEmployee);
router.delete('/employee', removeEmployee);

export default router;
