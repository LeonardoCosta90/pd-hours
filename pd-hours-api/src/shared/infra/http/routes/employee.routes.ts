import { Router } from 'express';
import employeeController from '@domain/employee/controllers/employee-controller';
import { validateBody } from '../middlewares/validations';
import createEmployeeValidation from '../validations/create-employee-validation';

const employeeRoutes = Router();

employeeRoutes.post(
  '/',
  validateBody(createEmployeeValidation),
  employeeController.createEmployee,
);
employeeRoutes.get('/', employeeController.listEmployee);
export { employeeRoutes };
