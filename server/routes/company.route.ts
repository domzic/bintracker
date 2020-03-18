import express from "express";
import {
    createCompany
} from '../controllers/company.controller';
import { authenticated } from '../middlewares/authenticated';

const router = express.Router();

router.post('/', createCompany);

export default router;
