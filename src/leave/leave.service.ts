import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { Leave } from 'src/leave/leave.entity';
import { LeaveRepository } from './leave.repository';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: LeaveRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  async recordLeave(request) {
    const telegramId = request.telegramId;
    const employeeRecord = await this.employeeRepository.getEmployeeByTelegramId(
      telegramId,
    );
    if (!employeeRecord) {
      throw new HttpException(
        "Employee with given telegram id doesn't exist",
        404,
      );
    }
    const leave: Leave = {
      id: 1,
      employee: employeeRecord,
      startDate: request.startDate,
      endDate: request.endDate,
      active: true,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    const resp = await this.leaveRepository.recordLeave(leave);
    if (resp) {
      return resp;
    } else {
      throw new HttpException('Leave could not be recorded', 404);
    }
  }
}
