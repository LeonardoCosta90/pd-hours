import { Employee } from '@domain/employee/typeorm/entities/employee';
import { Squad } from '@domain/squad/typeorm/entities/squad';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reports')
class Report {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column()
  spent_hours: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  employee_id: number;
}

export { Report };
