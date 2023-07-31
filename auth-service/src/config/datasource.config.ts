import { DataSourceOptions } from 'typeorm';

import { UserSchema } from '../user/infra/db/typeorm/user-schema';

import { config } from 'dotenv';

config();

export const dataSourceOptions = {
  type: 'mysql',
  host: process.env.NODE_ENV === 'LOCAL' ? 'localhost' : 'mysql',
  port: 3306,
  username: 'user_teste',
  password: 'senha_teste',
  database: 'wallet',
  entities: [UserSchema],
} as DataSourceOptions;
