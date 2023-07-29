import { DataSourceOptions } from 'typeorm';
import { CreateStatementTable1690636858726 } from '../statement/infra/db/typeorm/migrations/1690636858726-create_statement_table';
import { StatementSchema } from '../statement/infra/db/typeorm/statement-schema';
import { CreateUserTable1690500002287 } from '../user/infra/db/typeorm/migrations/1690500002287-create_user_table';
import { InsertUserTest1690500958218 } from '../user/infra/db/typeorm/migrations/1690500958218-insert_user_test';
import { UserSchema } from '../user/infra/db/typeorm/user-schema';

export const dataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user_teste',
  password: 'senha_teste',
  database: 'wallet',
  entities: [UserSchema, StatementSchema],
  migrations: [
    CreateUserTable1690500002287,
    InsertUserTest1690500958218,
    CreateStatementTable1690636858726,
  ],
  migrationsRun: true,
} as DataSourceOptions;
