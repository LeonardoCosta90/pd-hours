import { SquadRepository } from '@domain/squad/typeorm/repositories/squad-repository';
import { AppError } from '@shared/errors/app-error';
import { DayjsDateProvider } from '@shared/providers/date-provider/dayjs-date-provider';
import { getCustomRepository, getRepository, IsNull } from 'typeorm';
import { CreateEmployeeBody } from '../models/create-employee-body';
import { EmployeeResponsePaginate } from '../models/employee-paginate-response';
import { EmployeeQueryRequest } from '../models/employee-query-response';
import { Employee } from '../typeorm/entities/employee';
import { EmployeeRepository } from '../typeorm/repositories/employee-repository';

export class EmployeeService {
  format = new DayjsDateProvider();
  async createEmployee(body: CreateEmployeeBody): Promise<Employee> {
    const employeeRepository = getCustomRepository(EmployeeRepository);
    const squadRepository = getCustomRepository(SquadRepository);
    const squadExists = await squadRepository.findById(body.squadId);
    const employeeExists = await employeeRepository.findByName(body.name);

    if (!squadExists) {
      throw new AppError(`Não existe um squad com id: ${body.squadId}`, 400);
    }

    if (employeeExists) {
      throw new AppError(`Usuário com o nome: ${body.name} ja existe`, 400);
    }

    const squadEmployee = await employeeRepository.create({
      name: body.name,
      estimated_hours: body.estimatedHours,
      squad_id: body.squadId,
      created_at: this.format.convertToUTC(new Date()),
      updated_at: this.format.convertToUTC(new Date()),
    });
    const response = await employeeRepository.save(squadEmployee);
    return response;
  }

  async getEmployees(
    employeeQueryRequest: EmployeeQueryRequest,
  ): Promise<EmployeeResponsePaginate> {
    const employeeRepository = getRepository(Employee);
    const page = employeeQueryRequest.page
      ? Number(employeeQueryRequest.page)
      : 1;
    const totalItemsPerPage = employeeQueryRequest.totalItemsPerPage
      ? Number(employeeQueryRequest.totalItemsPerPage)
      : 5;
    const query = employeeRepository.createQueryBuilder('employees');

    query.skip((page - 1) * totalItemsPerPage).take(totalItemsPerPage);
    const [employees, count] = await query.getManyAndCount();
    const totalPages = Math.ceil(count / totalItemsPerPage);
    return {
      data: employees,
      squadName: '',
      totalItems: count,
      totalItemsPerPage,
      page,
      totalPages,
    };
  }

  async getEmployeesBySquadId(
    employeeQueryRequest: EmployeeQueryRequest,
  ): Promise<EmployeeResponsePaginate> {
    const employeeRepository = getRepository(Employee);
    const squadRepository = getCustomRepository(SquadRepository);
    const name = await squadRepository.findNameById(employeeQueryRequest.id);
    const page = employeeQueryRequest.page
      ? Number(employeeQueryRequest.page)
      : 1;
    const totalItemsPerPage = employeeQueryRequest.totalItemsPerPage
      ? Number(employeeQueryRequest.totalItemsPerPage)
      : 5;
    const query = employeeRepository
      .createQueryBuilder('employees')
      .where('employees.squad_id = :squadId', {
        squadId: employeeQueryRequest.id,
      });
    query.skip((page - 1) * totalItemsPerPage).take(totalItemsPerPage);
    const [employees, count] = await query.getManyAndCount();
    const totalPages = Math.ceil(count / totalItemsPerPage);
    return {
      data: employees,
      squadName: name,
      totalItems: count,
      totalItemsPerPage,
      page,
      totalPages,
    };
  }
}
