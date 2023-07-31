import { DataSourceOptions } from 'typeorm';
import { AccountSchema } from '../account/infra/db/typeorm/account-schema';
import { CreateAccountTable1690646689826 } from '../account/infra/db/typeorm/migrations/1690646689826-create_account_table';
import { InsertAccountFake1690646820889 } from 'src/account/infra/db/typeorm/migrations/1690646820889-insert_account_fake';

export const dataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user_teste',
  password: 'senha_teste',
  database: 'wallet',
  entities: [AccountSchema],
  migrations: [CreateAccountTable1690646689826, InsertAccountFake1690646820889],
  migrationsRun: true,
} as DataSourceOptions;
