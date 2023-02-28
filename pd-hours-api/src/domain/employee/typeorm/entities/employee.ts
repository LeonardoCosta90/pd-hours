import { Squad } from '@domain/squad/typeorm/entities/squad';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('employees')
class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  estimated_hours: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Squad)
  @JoinColumn({ name: 'squad_id' })
  squad: Squad;

  @Column()
  squad_id: number;
}

export { Employee };
