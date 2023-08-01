import { DataSourceOptions } from 'typeorm';
import { CreateTransactionTable1690661499206 } from '../statement/infra/db/typeorm/migrations/1690661499206-create_transaction_table';
import { TransactionSchema } from 'src/statement/infra/db/typeorm/transaction-schema';
import { databaseConstants } from './constants';

export const dataSourceOptions = {
  type: 'mysql',
  host: databaseConstants.host,
  port: databaseConstants.port,
  username: databaseConstants.username,
  password: databaseConstants.password,
  database: databaseConstants.database,
  entities: [TransactionSchema],
  migrations: [CreateTransactionTable1690661499206],
  migrationsRun: true,
} as DataSourceOptions;
