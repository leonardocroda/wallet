import { User } from '../../../domain/user/entity/users.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
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
});
