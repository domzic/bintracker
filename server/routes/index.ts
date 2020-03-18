import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import statRoutes from './stat.route';
import companyRoutes from './company.route';
import containerRoutes from './container.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/stat', statRoutes);
router.use('/company', companyRoutes);
router.use('/container', containerRoutes);

export default router;
