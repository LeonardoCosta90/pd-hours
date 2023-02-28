import { Request, Response } from 'express';
import { EmployeeQueryRequest } from '../models/employee-query-response';
import { EmployeeService } from '../services/employee-service';

async function createEmployee(
  request: Request,
  response: Response,
): Promise<Response> {
  const employeeService = new EmployeeService();

  const user = await employeeService.createEmployee(request.body);

  return response.status(201).json(user);
}

async function listEmployee(
  request: Request,
  response: Response,
): Promise<Response> {
  const employeeService = new EmployeeService();

  const query: EmployeeQueryRequest = {
    totalItemsPerPage: request.query.totalItemsPerPage as string,
    page: request.query.page as string,
  };

  const user = await employeeService.getEmployees(query);

  return response.status(200).json(user);
}

export default {
  createEmployee,
  listEmployee,
};
