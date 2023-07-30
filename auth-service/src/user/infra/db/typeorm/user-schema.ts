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
  },
  relations: {
    account: {
      target: 'Account',
      type: 'many-to-one',
      joinColumn: {
        name: 'account_id',
        referencedColumnName: 'id',
      },
    },
  },
});
