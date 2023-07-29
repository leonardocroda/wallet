import { UserEntity } from 'src/user/infra/db/typeorm/user-entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  balance: number;

  @Column({ type: 'bigint', unique: true })
  number: number;

  @OneToMany(() => UserEntity, (user) => user.account)
  users: UserEntity[];
}
