import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { createToken } from '../auth/auth.common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async userSignup(userDetails) {
    const password = userDetails.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user: User = {
      id: userDetails.id,
      username: userDetails.username,
      password: hashedPassword,
      role: userDetails.role,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    const resp = await this.userRepository.createUser(user);
    if (resp) {
      return resp;
    } else {
      throw new HttpException('User could not be created', 404);
    }
  }

  async userLogin(userDetails) {
    const userRecord = await this.userRepository.getUserByUsername(
      userDetails.username,
    );
    if (userRecord) {
      const hashedPassword = userRecord.password;
      const plainTextPassword = userDetails.password;
      if (bcrypt.compareSync(plainTextPassword, hashedPassword)) {
        const tokenData = createToken(userRecord);
        console.log(tokenData);
        return tokenData;
      }
      throw new UnauthorizedException({
        error: 'Invalid credentials',
      });
    } else {
      throw new HttpException('User not found. Please signup first.', 404);
    }
  }
}
