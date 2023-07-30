import { User } from '../../../user/domain/entity/user.entity';

export class Account {
  id: number;
  number: number;
  balance: number;
  users?: User[];
}
