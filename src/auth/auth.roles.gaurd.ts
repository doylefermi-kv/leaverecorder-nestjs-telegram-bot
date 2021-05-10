import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { validateAuthToken } from './auth.common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    try {
      const verificationResponse: any = validateAuthToken(request);
      if (verificationResponse && verificationResponse.role) {
        if (roles.includes(verificationResponse.role)) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
