import express from 'express';
import { createCompany,
    getCompany,
    addEmployee,
    removeEmployee,
    updateCompany } from '../controllers/company.controller';
import { authenticated } from '../middlewares/authenticated';

const router = express.Router();

router.post('/', createCompany);
router.post('/update', updateCompany);
router.get('/', authenticated, getCompany);
router.post('/employee', addEmployee);
router.delete('/employee', removeEmployee);

export default router;
