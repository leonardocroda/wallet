import { User } from '../entity/user.entity';

export interface GetUserByEmailRepository {
  getUserByEmail(email: string): Promise<User>;
}
