import { Transaction } from '../../entity/transaction.entity';

export interface FindAllTransactionsRepository {
  findAllTransactions({
    accountId,
  }: {
    accountId: number;
  }): Promise<Transaction[]>;
}
