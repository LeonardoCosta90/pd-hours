import { Employee } from '@domain/employee/typeorm/entities/employee';
import { EntityRepository, Repository } from 'typeorm';
import { Report } from '../entities/report';

@EntityRepository(Report)
class ReportRepository extends Repository<Report> {
  public async findById(id: number): Promise<Report | undefined> {
    const report = await this.findOne({
      where: {
        id,
      },
    });

    return report;
  }

  public async findByName(name: string): Promise<Report | undefined> {
    const report = await this.findOne({
      where: {
        name: name,
      },
    });

    return report;
  }
}

export { ReportRepository };
