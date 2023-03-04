import { Router } from 'express';
import employeeController from '@domain/employee/controllers/employee-controller';
import { validateBody, validateParams } from '../middlewares/validations';
import createEmployeeValidation from '../validations/create-employee-validation';
import idValidation from '../validations/id-validation';

const employeeRoutes = Router();

employeeRoutes.post(
  '/',
  validateBody(createEmployeeValidation),
  employeeController.createEmployee,
);
employeeRoutes.get('/', employeeController.listEmployee);
employeeRoutes.get(
  '/:id',
  validateParams(idValidation),
  employeeController.listEmployeeBySquadId,
);
export { employeeRoutes };
