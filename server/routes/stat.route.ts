import express from 'express';
import { getActions, getMonthlyReport } from '../controllers/stat.controller';
import { authenticated } from '../middlewares/authenticated';

const router = express.Router();

router.get('/actions', authenticated, getActions);
router.get('/monthly', authenticated, getMonthlyReport);

export default router;
