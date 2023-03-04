import { Request, Response } from 'express';
import { ReportQueryRequest } from '../models/report-query-response';
import { ReportService } from '../services/report-service';

async function createReport(
  request: Request,
  response: Response,
): Promise<Response> {
  const reportService = new ReportService();

  const user = await reportService.createReport(request.body);

  return response.status(201).json(user);
}

async function listReport(
  request: Request,
  response: Response,
): Promise<Response> {
  const reportService = new ReportService();

  const param: ReportQueryRequest = {
    startDate: request.params?.startDate,
    totalItemsPerPage: request.body.totalItemsPerPage as string,
    squadId: +request.params?.squadId,
    page: request.params.body as string,
  };
  const user = await reportService.getReport(param);
  return response.status(200).json(user);
}

export default {
  createReport,
  listReport,
};
