import { User } from '../entity/users.entity';

export interface GetUserByEmailRepository {
  getUserByEmail(email: string): Promise<User>;
}
