import { Employee } from '@domain/employee/typeorm/entities/employee';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Employee)
class EmployeeRepository extends Repository<Employee> {
  public async findById(id: number): Promise<Employee | undefined> {
    const employee = await this.findOne({
      where: {
        id,
      },
    });

    return employee;
  }

  public async findByName(name: string): Promise<Employee | undefined> {
    const employee = await this.findOne({
      where: {
        name: name,
      },
    });

    return employee;
  }
}

export { EmployeeRepository };
