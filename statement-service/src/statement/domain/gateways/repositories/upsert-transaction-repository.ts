import { Transaction } from '../../entity/transaction.entity';

export interface UpsertTransactionRepository {
  upsertTransaction(transaction: Transaction): Promise<void>;
}
