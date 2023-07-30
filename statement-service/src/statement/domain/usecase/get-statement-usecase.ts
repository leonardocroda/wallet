import { Transaction } from '../entity/transaction.entity';
import { FindAllTransactionsRepository } from '../gateways/repositories/find-all-transactions-repository';

export class GetStatementUsecase {
  constructor(
    private readonly findAllTransactionsRepository: FindAllTransactionsRepository,
  ) {}
  async execute({ accountId }: { accountId: number }): Promise<Transaction[]> {
    const transactions =
      await this.findAllTransactionsRepository.findAllTransactions({
        accountId,
      });

    return transactions;
  }
}
