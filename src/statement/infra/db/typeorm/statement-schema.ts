import { Transaction } from '../../../domain/entity/transaction.entity';
import { EntitySchema } from 'typeorm';

export const StatementSchema = new EntitySchema<Transaction>({
  name: 'statement',
  target: Transaction,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
    },
    accountId: {
      type: 'varchar',
    },
    purchaseId: {
      type: 'varchar',
    },
    transferId: {
      type: 'varchar',
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
      type: 'varchar',
    },
  },
});
