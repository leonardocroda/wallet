import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('statement')
export class StatementEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'int' })
  accountId: number;

  @Column({ type: 'varchar', nullable: true })
  purchaseId: string | null;

  @Column({ type: 'varchar', nullable: true })
  transferId: string | null;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'varchar' })
  type: 'TRANSFER_IN' | 'TRANSFER_OUT' | 'PURCHASE' | 'REFUND';

  @Column({ type: 'varchar' })
  sourceDestinationName: string;

  @Column({ type: 'varchar' })
  status: 'PROCESSING' | 'PROCESSED' | 'CANCELED';

  @Column({ type: 'varchar' })
  date: string;
}
