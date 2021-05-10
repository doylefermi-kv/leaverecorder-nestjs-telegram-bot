import { User } from './user.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async createUser(userDetails: User) {
    const user = await getConnection().getRepository(User).insert(userDetails);
    return user;
  }

  public async getUserByUsername(username: string) {
    const user = await getConnection()
      .getRepository(User)
      .findOne({ where: { username: username } });
    return user;
  }
}
