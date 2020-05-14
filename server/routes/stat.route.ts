import express from 'express';
import { getActions, getMonthlyReport, getUnregisteredDevices } from '../controllers/stat.controller';
import { authenticated } from '../middlewares/authenticated';

const router = express.Router();

router.get('/actions', authenticated, getActions);
router.get('/monthly', authenticated, getMonthlyReport);
router.get('/devices', authenticated, getUnregisteredDevices);

export default router;
