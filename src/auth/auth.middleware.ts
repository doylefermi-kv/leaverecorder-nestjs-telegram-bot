import {
  ForbiddenException,
  HttpException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validateAuthToken } from './auth.common';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    try {
      const verificationResponse: any = validateAuthToken(request);
      if (verificationResponse) {
        return next();
      }
      throw new ForbiddenException();
    } catch (error) {
      next(new HttpException(error.message, 403));
    }
  }
}
