import { Transaction } from '../../../domain/entity/transaction.entity';
import { UpsertTransactionRepository } from '../../../domain/gateways/repositories/upsert-transaction-repository';
import { Repository } from 'typeorm';
import { FindAllTransactionsRepository } from 'src/statement/domain/gateways/repositories/find-all-transactions-repository';

export class TransactionTypeOrmRepository
  implements UpsertTransactionRepository, FindAllTransactionsRepository
{
  constructor(private repository: Repository<Transaction>) {}

  async upsertTransaction(transaction: Transaction): Promise<void> {
    await this.repository.save({
      ...transaction,
      account: { id: transaction.accountId },
    });
  }

  async findAllTransactions({
    accountId,
  }: {
    accountId: number;
  }): Promise<Transaction[]> {
    return this.repository.find({ where: { account: { id: accountId } } });
  }
}
