import { DayjsDateProvider } from './../../../shared/providers/date-provider/dayjs-date-provider';
import { EmployeeRepository } from '@domain/employee/typeorm/repositories/employee-repository';
import { AppError } from '@shared/errors/app-error';
import { getCustomRepository, getRepository } from 'typeorm';
import { CreateReportBody } from '../models/create-report-body';
import { ReportQueryRequest } from '../models/report-query-response';
import { Report } from '../typeorm/entities/report';
import { ReportRepository } from '../typeorm/repositories/resport-repository';

export class ReportService {
  format = new DayjsDateProvider();
  async createReport(body: CreateReportBody): Promise<Report> {
    const reportRepository = getCustomRepository(ReportRepository);
    const employeeRepository = getCustomRepository(EmployeeRepository);
    const employeeExists = await employeeRepository.findById(body.employeeId);

    if (!employeeExists) {
      throw new AppError(
        `Não foi encontrado o usuário com o id: ${body.employeeId}`,
        404,
      );
    }

    const report = await reportRepository.create({
      description: body.description,
      employee_id: body.employeeId,
      spent_hours: body.spentHours,
      created_at: this.format.convertToUTC(new Date()),
      updated_at: this.format.convertToUTC(new Date()),
    });
    const response = await reportRepository.save(report);

    return response;
  }

  async getReport(reportQueryRequest: ReportQueryRequest): Promise<any> {
    const reportRepository = getRepository(Report);
    const page = reportQueryRequest.page ? Number(reportQueryRequest.page) : 1;
    const totalItemsPerPage = reportQueryRequest.totalItemsPerPage
      ? Number(reportQueryRequest.totalItemsPerPage)
      : 5;
    const query = reportRepository
      .createQueryBuilder('reports')
      .innerJoinAndSelect('reports.employee', 're')
      .innerJoinAndSelect('re.squad', 'rs')
      .where('rs.id = :id', {
        id: reportQueryRequest.squadId,
      });
    query.skip((page - 1) * totalItemsPerPage).take(totalItemsPerPage);
    const [reports, count] = await query.getManyAndCount();

    const hours = await query
      .select('SUM(reports.spent_hours)', 'totalSpentHours')
      .addSelect('AVG(reports.spent_hours)', 'averageSpentHours')
      .addSelect('COUNT(DISTINCT reports.employee_id)', 'count')
      .getRawOne();
    const totalPages = Math.ceil(count / totalItemsPerPage);

    const avg = +hours.averageSpentHours;
    const avgPrecision = avg.toPrecision(2);

    return {
      data: reports,
      totalUsers: Number(hours.count),
      totalHours: Number(hours.totalSpentHours),
      averageHours: Number(avgPrecision),
      totalItems: count,
      totalItemsPerPage,
      page,
      totalPages,
    };
  }
}
