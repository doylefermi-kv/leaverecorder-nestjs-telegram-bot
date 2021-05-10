import { Leave } from 'src/leave/leave.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
@Entity('employees')
@Unique('unique_telegram_per_employee', ['telegramId', 'emailAddress'])
export class Employee {
  @PrimaryGeneratedColumn('increment')
  @Generated('increment')
  public id: number;

  @Column({ name: 'telegram_id' })
  public telegramId: string;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ type: 'text', name: 'gender' })
  public gender: Gender;

  @Column({ name: 'email_address' })
  public emailAddress: string;

  @OneToMany(() => Leave, (leave) => leave.employee, { nullable: true })
  leaves: Leave[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
