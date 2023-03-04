import { Router } from 'express';
import { employeeRoutes } from './employee.routes';
import { reportRoutes } from './report.routes';
import { squadRoutes } from './squad.routes';

const router = Router();

router.use('/squads', squadRoutes);
router.use('/employees', employeeRoutes);
router.use('/reports', reportRoutes);

export { router };
