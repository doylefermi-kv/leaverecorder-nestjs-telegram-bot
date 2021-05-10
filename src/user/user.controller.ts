import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('employee-demo/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  userSignup(@Req() request: Request): any {
    return this.userService.userSignup(request.body);
  }

  @Post('/login')
  userLogin(@Req() request: Request): any {
    return this.userService.userLogin(request.body);
  }
}
