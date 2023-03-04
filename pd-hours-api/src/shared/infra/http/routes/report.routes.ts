import reportController from '@domain/report/controllers/report-controller';
import { Router } from 'express';
import { validateBody, validateParams } from '../middlewares/validations';
import createReportValidation from '../validations/create-report-validation';
import getReportValidation from '../validations/get-report-validation';

const reportRoutes = Router();

reportRoutes.post(
  '/',
  validateBody(createReportValidation),
  reportController.createReport,
);
reportRoutes.get(
  '/:squadId/:startDate?/:endDate?',
  validateParams(getReportValidation),
  reportController.listReport,
);
export { reportRoutes };
