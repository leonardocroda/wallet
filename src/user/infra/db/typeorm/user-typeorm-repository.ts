import { User } from '../../../domain/entity/user.entity';
import { GetUserByEmailRepository } from '../../../domain/gateways/get-user-by-email-repository';
import { Repository } from 'typeorm';

export class UserTypeOrmRepository implements GetUserByEmailRepository {
  constructor(private repository: Repository<User>) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }
}
