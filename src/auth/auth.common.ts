import { User } from '../user/user.entity';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../common/common.constants';

export const createToken = function (userDetails: User) {
  const expiresIn = 60 * 60; // an hour
  const secret = JWT_SECRET;
  const dataStoredInToken = {
    username: userDetails.username,
    role: userDetails.role,
  };
  return {
    expiresInSeconds: expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  };
};

export const validateAuthToken = function (request) {
  const reqAuthToken = request.headers.authorization.split(' ')[1];
  const verificationResponse: any = jwt.verify(reqAuthToken, JWT_SECRET);
  return verificationResponse;
};
