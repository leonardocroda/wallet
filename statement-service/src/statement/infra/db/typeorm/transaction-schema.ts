import { Transaction } from '../../../domain/entity/transaction.entity';
import { EntitySchema } from 'typeorm';

export const TransactionSchema = new EntitySchema<Transaction>({
  name: 'Transaction',
  target: Transaction,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
    },
    externalId: {
      type: 'varchar',
      name: 'external_id',
    },
    amount: {
      type: 'double',
    },
    type: {
      type: 'varchar',
    },
    sourceDestinationName: {
      type: 'varchar',
    },
    status: {
      type: 'varchar',
    },
    date: {
      type: 'datetime',
    },
    accountId: {
      type: 'bigint',
      name: 'account_id',
    },
  },
});
