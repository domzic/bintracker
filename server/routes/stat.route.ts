import express from 'express';
import { getActions } from '../controllers/stat.controller';
import { authenticated } from '../middlewares/authenticated';

const router = express.Router();

router.get('/actions', authenticated, getActions);

export default router;
