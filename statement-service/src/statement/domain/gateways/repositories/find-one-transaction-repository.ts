import { Transaction } from '../../entity/transaction.entity';

export interface FindOneTransactionRepository {
  findOne(transactionId: string): Promise<Transaction>;
}
