import { DataSourceOptions } from 'typeorm';
import { UserSchema } from '../user/infra/db/typeorm/user-schema';
import { config } from 'dotenv';
import { CreateUserTable1690649242920 } from 'src/user/infra/db/typeorm/migrations/1690649242920-create_user_table';
import { InsertUserFake1690649278082 } from 'src/user/infra/db/typeorm/migrations/1690649278082-insert_user_fake';

config();

export const dataSourceOptions = {
  type: 'mysql',
  host: process.env.NODE_ENV === 'LOCAL' ? 'localhost' : 'mysql',
  port: 3306,
  username: 'user_teste',
  password: 'senha_teste',
  database: 'wallet',
  entities: [UserSchema],
  migrations: [CreateUserTable1690649242920, InsertUserFake1690649278082],
  migrationsRun: true,
} as DataSourceOptions;
