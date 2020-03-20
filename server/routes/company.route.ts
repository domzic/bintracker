import express from "express";
import {
    createCompany,
    getCompany,
    addEmployee,
    removeEmployee
} from '../controllers/company.controller';
import { authenticated } from '../middlewares/authenticated';

const router = express.Router();

router.post('/', authenticated, createCompany);
router.get('/', authenticated, getCompany);
router.post('/employee', addEmployee);
router.delete('/employee', removeEmployee);

export default router;
