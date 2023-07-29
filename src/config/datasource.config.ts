import { DataSourceOptions } from 'typeorm';
import { CreateStatementTable1690636858726 } from '../statement/infra/db/typeorm/migrations/1690636858726-create_statement_table';
import { StatementEntity } from '../statement/infra/db/typeorm/statement-entity';
import { UserEntity } from '../user/infra/db/typeorm/user-entity';
import { AccountEntity } from '../account/infra/db/typeorm/account-entity';
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
  entities: [UserEntity, StatementEntity, AccountEntity],
  migrations: [
    CreateUserTable1690649242920,
    InsertUserFake1690649278082,
    CreateStatementTable1690636858726,
    CreateAccountTable1690646689826,
    InsertAccountFake1690646820889,
  ],
  migrationsRun: true,
} as DataSourceOptions;
