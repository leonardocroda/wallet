import { Transaction } from '../../entity/transaction.entity';

export interface UpsertStatementTransactionRepository {
  upsertStatementTransaction(transaction: Transaction): Promise<void>;
}
