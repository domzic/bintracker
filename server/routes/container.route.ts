import express from "express";
import { authenticated } from '../middlewares/authenticated';

import {
    getContainers
} from '../controllers/container.controller';
  
const router = express.Router();

router.get('/', authenticated, getContainers);

export default router;
