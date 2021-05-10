import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { AuthenticationMiddleware } from './auth/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LeaveService } from './leave/leave.service';
import { LeaveController } from './leave/leave.controller';
import { LeaveModule } from './leave/leave.module';

@Module({
  imports: [TypeOrmModule.forRoot(), EmployeeModule, UserModule, LeaveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('employee-demo/employee');
  }
}
