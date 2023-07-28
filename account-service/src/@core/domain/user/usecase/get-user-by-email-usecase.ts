import { User } from '../entity/users.entity';
import { GetUserByEmailRepository } from '../gateways/get-user-by-email-repository';

export class GetUserByEmailUsecase {
  constructor(private repository: GetUserByEmailRepository) {}

  async getByEmail(email: string): Promise<User> {
    return this.repository.getUserByEmail(email);
  }
}
