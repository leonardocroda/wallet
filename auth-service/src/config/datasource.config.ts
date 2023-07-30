import { DataSourceOptions } from 'typeorm';

import { UserSchema } from '../user/infra/db/typeorm/user-schema';
import { AccountSchema } from '../account/infra/db/typeorm/account-schema';

export const dataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user_teste',
  password: 'senha_teste',
  database: 'wallet',
  entities: [UserSchema, AccountSchema],
} as DataSourceOptions;
