import { Account } from 'src/account/domain/entity/account';
import { Transaction } from '../../../domain/entity/transaction.entity';
import { UpsertTransactionRepository } from '../../../domain/gateways/repositories/upsert-transaction-repository';
import { Repository } from 'typeorm';

export class TransactionTypeOrmRepository
  implements UpsertTransactionRepository
{
  constructor(private repository: Repository<Transaction>) {}

  async upsertTransaction(transaction: Transaction): Promise<void> {
    await this.repository.save({
      ...transaction,
      account: { id: transaction.accountId },
    });
  }
}
