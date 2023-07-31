import { User } from '../../../domain/entity/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    accountId: {
      type: 'bigint',
      name: 'account_id',
    },
  },
});
