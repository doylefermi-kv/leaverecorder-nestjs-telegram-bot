import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/employee.entity';
import { RolesGuard } from 'src/auth/auth.roles.gaurd';
import { Roles } from 'src/common/common.constants';
import { LeaveRepository } from 'src/leave/leave.repository';

@Controller('employee-demo/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [Roles.USER, Roles.ADMIN])
  getEmployeeById(@Req() request: Request): Promise<Employee> {
    return this.employeeService.getEmployeeById(parseInt(request.params.id));
  }

  @Get()
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [Roles.USER, Roles.ADMIN])
  getEmployees(): Promise<Employee[]> {
    return this.employeeService.getAllEmployees();
  }

  @Post()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [Roles.ADMIN])
  createEmployee(@Body() employeeDetails: Employee): any {
    return this.employeeService.createEmployee(employeeDetails);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [Roles.ADMIN])
  updateEmployee(@Body() employeeDetails: Employee): any {
    return this.employeeService.updateEmployee(
      employeeDetails.id,
      employeeDetails,
    );
  }

  @Delete()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [Roles.ADMIN])
  deleteEmployeeById(@Req() request: Request): any {
    return this.employeeService.deleteEmployeeById(parseInt(request.params.id));
  }
}
