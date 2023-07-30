import { Transaction } from '../../../statement/domain/entity/transaction.entity';
import { User } from '../../../user/domain/entity/user.entity';

export class Account {
  id: number;
  number: number;
  balance: number;
  users?: User[];
  transactions?: Transaction[];
}
