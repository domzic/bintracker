import express from "express";
import { authenticated } from '../middlewares/authenticated';

import {
    getContainers,
    addContainer, removeContainer
} from '../controllers/container.controller';
  
const router = express.Router();

router.get('/', authenticated, getContainers);
router.post('/', authenticated, addContainer);
router.delete('/', authenticated, removeContainer);

export default router;
