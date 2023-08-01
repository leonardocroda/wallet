import { Transaction } from '../../../domain/entity/transaction.entity';
import { UpsertTransactionRepository } from '../../../domain/gateways/repositories/upsert-transaction-repository';
import { Repository } from 'typeorm';
import { FindAllTransactionsRepository } from 'src/statement/domain/gateways/repositories/find-all-transactions-repository';
import { FindOneTransactionRepository } from 'src/statement/domain/gateways/repositories/find-one-transaction-repository';

export class TransactionTypeOrmRepository
  implements
    UpsertTransactionRepository,
    FindAllTransactionsRepository,
    FindOneTransactionRepository
{
  constructor(private repository: Repository<Transaction>) {}

  async upsertTransaction(transaction: Transaction): Promise<void> {
    await this.repository.save(transaction);
  }

  async findAllTransactions({
    accountId,
  }: {
    accountId: number;
  }): Promise<Transaction[]> {
    return this.repository.find({
      where: { accountId: accountId },
    });
  }

  async findOne(transactionId: string): Promise<Transaction> {
    return this.repository.findOne({ where: { id: transactionId } });
  }
}
