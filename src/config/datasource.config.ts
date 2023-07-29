import { DataSourceOptions } from 'typeorm';
import { CreateStatementTable1690636858726 } from '../statement/infra/db/typeorm/migrations/1690636858726-create_statement_table';
import { StatementEntity } from '../statement/infra/db/typeorm/statement-entity';
import { CreateUserTable1690500002287 } from '../user/infra/db/typeorm/migrations/1690500002287-create_user_table';
import { InsertUserTest1690500958218 } from '../user/infra/db/typeorm/migrations/1690500958218-insert_user_test';
import { UserEntity } from '../user/infra/db/typeorm/user-entity';
import { AccountEntity } from '../account/infra/db/typeorm/account-entity';
import { CreateAccountTable1690646689826 } from '../account/infra/db/typeorm/migrations/1690646689826-create_account_table';
import { InsertAccountFake1690646820889 } from 'src/account/infra/db/typeorm/migrations/1690646820889-insert_account_fake';

export const dataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user_teste',
  password: 'senha_teste',
  database: 'wallet',
  entities: [UserEntity, StatementEntity, AccountEntity],
  migrations: [
    CreateUserTable1690500002287,
    InsertUserTest1690500958218,
    CreateStatementTable1690636858726,
    CreateAccountTable1690646689826,
    InsertAccountFake1690646820889,
  ],
  migrationsRun: true,
} as DataSourceOptions;
