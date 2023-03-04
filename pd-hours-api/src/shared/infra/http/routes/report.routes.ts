import reportController from '@domain/report/controllers/report-controller';
import { Router } from 'express';
import { validateBody } from '../middlewares/validations';
import createReportValidation from '../validations/create-report-validation';

const reportRoutes = Router();

reportRoutes.post(
  '/',
  validateBody(createReportValidation),
  reportController.createReport,
);
reportRoutes.get('/:squadId', reportController.listReport);
export { reportRoutes };
