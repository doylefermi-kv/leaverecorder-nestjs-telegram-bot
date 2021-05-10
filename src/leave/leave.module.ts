import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { LeaveController } from './leave.controller';
import { Leave } from './leave.entity';
import { LeaveRepository } from './leave.repository';
import { LeaveService } from './leave.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Leave, LeaveRepository, EmployeeRepository]),
  ],
  exports: [TypeOrmModule],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
