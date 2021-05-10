import { Employee } from 'src/employee/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('leaves')
export class Leave {
  @PrimaryGeneratedColumn('increment')
  @Generated('increment')
  public id: number;

  @Column({ type: 'timestamp', name: 'start_date' })
  public startDate;

  @Column({ type: 'timestamp', name: 'end_date' })
  public endDate;

  @Column({ name: 'active' })
  public active: boolean;

  @ManyToOne(() => Employee, (employee) => employee.leaves, { nullable: false })
  employee: Employee;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
