import { Account } from '../../../account/domain/entity/account';

export class User {
  id: number;
  email: string;
  name: string;
  password?: string;
  account?: Account;
}
