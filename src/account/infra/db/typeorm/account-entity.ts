import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  balance: number;

  @Column({ type: 'bigint', unique: true })
  number: number;
}
