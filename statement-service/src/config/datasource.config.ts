import { DataSourceOptions } from 'typeorm';
import { CreateTransactionTable1690661499206 } from '../statement/infra/db/typeorm/migrations/1690661499206-create_transaction_table';
import { TransactionSchema } from '../statement/infra/db/typeorm/transaction-schema';
import { UserSchema } from '../user/infra/db/typeorm/user-schema';
import { AccountSchema } from '../account/infra/db/typeorm/account-schema';
import { CreateAccountTable1690646689826 } from '../account/infra/db/typeorm/migrations/1690646689826-create_account_table';
import { InsertAccountFake1690646820889 } from 'src/account/infra/db/typeorm/migrations/1690646820889-insert_account_fake';
import { CreateUserTable1690649242920 } from 'src/user/infra/db/typeorm/migrations/1690649242920-create_user_table';
import { InsertUserFake1690649278082 } from 'src/user/infra/db/typeorm/migrations/1690649278082-insert_user_fake';

export const dataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user_teste',
  password: 'senha_teste',
  database: 'wallet',
  entities: [UserSchema, TransactionSchema, AccountSchema],
  // synchronize: true,
  migrations: [
    CreateUserTable1690649242920,
    InsertUserFake1690649278082,
    CreateTransactionTable1690661499206,
    CreateAccountTable1690646689826,
    InsertAccountFake1690646820889,
  ],
  migrationsRun: true,
} as DataSourceOptions;
