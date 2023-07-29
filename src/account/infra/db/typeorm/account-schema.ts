import { Account } from '../../../../account/domain/entity/account';
import { EntitySchema } from 'typeorm';

export const AccountSchema = new EntitySchema<Account>({
  name: 'Account',
  target: Account,
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: true,
    },
    balance: {
      type: 'double',
    },
    number: {
      type: 'bigint',
      unique: true,
    },
  },
  relations: {
    users: {
      target: 'User',
      type: 'one-to-many',
      inverseSide: 'account',
    },
    transactions: {
      target: 'Transaction',
      type: 'one-to-many',
      inverseSide: 'account',
    },
  },
});
