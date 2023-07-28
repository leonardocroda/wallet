import { User } from '../../../domain/user/entity/users.entity';
import { GetUserByEmailRepository } from '../../../domain/user/gateways/get-user-by-email-repository';
import { Repository } from 'typeorm';

export class UserTypeOrmRepository implements GetUserByEmailRepository {
  constructor(private repository: Repository<User>) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }
}
