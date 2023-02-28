export interface ReportQueryRequest {
  startDate: string;
  endDate: string;
  employee_id: number;
  page?: string;
  totalItemsPerPage?: string;
}
