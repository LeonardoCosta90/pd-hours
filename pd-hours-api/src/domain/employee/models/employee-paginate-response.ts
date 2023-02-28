import { Employee } from '../typeorm/entities/employee';

export interface EmployeeResponsePaginate {
  data: Employee[];
  totalItems: number;
  totalItemsPerPage: number;
  page: number;
  totalPages: number;
}
