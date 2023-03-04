import { Report } from '@domain/report/typeorm/entities/report';

export interface ReportResponsePaginate {
  data: Report[];
  totalUsers: number;
  totalHours: number;
  averageHours: number;
  totalItems: number;
  totalItemsPerPage: number;
  page: number;
  totalPages: number;
}
