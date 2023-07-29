import { AccountEntity } from 'src/account/infra/db/typeorm/account-entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  accountId: number;

  @ManyToOne(() => AccountEntity, (account) => account.users)
  account: AccountEntity;
}
