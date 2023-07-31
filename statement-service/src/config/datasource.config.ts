import { DataSourceOptions } from 'typeorm';
import { CreateTransactionTable1690661499206 } from '../statement/infra/db/typeorm/migrations/1690661499206-create_transaction_table';
import { TransactionSchema } from 'src/statement/infra/db/typeorm/transaction-schema';

export const dataSourceOptions = {
  type: 'mysql',
  host: process.env.NODE_ENV === 'LOCAL' ? 'localhost' : 'mysql',
  port: 3306,
  username: 'user_teste',
  password: 'senha_teste',
  database: 'wallet',
  entities: [TransactionSchema],
  migrations: [CreateTransactionTable1690661499206],
  migrationsRun: true,
} as DataSourceOptions;
