import { Employee } from '../typeorm/entities/employee';

export interface EmployeeResponsePaginate {
  data: Employee[];
  squadName?: string;
  totalItems: number;
  totalItemsPerPage: number;
  page: number;
  totalPages: number;
}
