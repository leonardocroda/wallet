import { DataSourceOptions } from 'typeorm';

import { UserSchema } from '../user/infra/db/typeorm/user-schema';

export const dataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user_teste',
  password: 'senha_teste',
  database: 'wallet',
  entities: [UserSchema],
} as DataSourceOptions;
