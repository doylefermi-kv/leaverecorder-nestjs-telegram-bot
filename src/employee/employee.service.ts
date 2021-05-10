import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/employee.entity';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { LeaveService } from 'src/leave/leave.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: EmployeeRepository,
  ) {}

  async getEmployeeById(employeeId: number) {
    const resp = await this.employeeRepository.getEmployeeById(employeeId);
    if (resp) {
      return resp;
    } else {
      throw new HttpException('Employee not found', 404);
    }
  }

  async getAllEmployees() {
    const resp = await this.employeeRepository.getAllEmployees();
    return resp;
  }

  async getEmployeesByQParams(qParam) {
    const resp = await this.employeeRepository.getEmployeesByQParams(qParam);
    if (resp) {
      return resp;
    } else {
      throw new HttpException('No records found', 404);
    }
  }

  async deleteEmployeeById(employeeId: number) {
    await this.getEmployeeById(employeeId);
    const resp = await this.employeeRepository.deleteEmployeeById(employeeId);
    if (resp) {
      return resp;
    } else {
      throw new HttpException('Could not delete employee', 404);
    }
  }

  async createEmployee(employeeDetails) {
    const employee: Employee = {
      id: employeeDetails.id,
      telegramId: employeeDetails.telegramId,
      firstName: employeeDetails.firstName,
      lastName: employeeDetails.lastName,
      gender: employeeDetails.gender,
      emailAddress: employeeDetails.emailAddress,
      leaves: employeeDetails.leaves,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    try {
      const resp = await this.employeeRepository.createEmployee(employee);
      if (resp) {
        return resp;
      } else {
        throw new HttpException('Employee could not be created', 404);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateEmployee(employeeId: number, employeeDetails) {
    await this.getEmployeeById(employeeId);
    const employee: Employee = {
      id: employeeId,
      telegramId: employeeDetails.telegramId,
      firstName: employeeDetails.firstName,
      lastName: employeeDetails.lastName,
      gender: employeeDetails.gender,
      emailAddress: employeeDetails.emailAddress,
      leaves: employeeDetails.leaves,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    const resp = await this.employeeRepository.updateEmployee(employee);
    if (resp && resp.affected) {
      return { numberOfRowsUpdated: resp.affected };
    } else {
      throw new HttpException('Could not update employee', 404);
    }
  }
}
