import { Body, Controller, Post } from '@nestjs/common';
import { Leave } from './leave.entity';
import { LeaveService } from './leave.service';

@Controller('employee-demo/leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  recordLeave(@Body() request: any): any {
    return this.leaveService.recordLeave(request);
  }
}
