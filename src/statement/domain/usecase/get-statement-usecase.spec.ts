// test/get-statement.usecase.spec.ts

import { GetStatementUsecase } from './get-statement-usecase';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../entity/transaction.entity';
import { FindAllTransactionsRepository } from '../gateways/repositories/find-all-transactions-repository';

class MockFindAllTransactionsRepository
  implements FindAllTransactionsRepository
{
  findAllTransactions = jest.fn();
}

describe('GetStatementUsecase', () => {
  let usecase: GetStatementUsecase;
  let findAllTransactionsRepository: MockFindAllTransactionsRepository;

  beforeEach(() => {
    findAllTransactionsRepository = {
      findAllTransactions: jest.fn(),
    };
    usecase = new GetStatementUsecase(findAllTransactionsRepository);
  });

  it('deve retornar uma lista vazia se não houver transações', async () => {
    findAllTransactionsRepository.findAllTransactions.mockResolvedValue([]);

    const result = await usecase.execute({ accountId: 1 });

    expect(result).toEqual([]);
    expect(
      findAllTransactionsRepository.findAllTransactions,
    ).toHaveBeenCalledTimes(1);
    expect(
      findAllTransactionsRepository.findAllTransactions,
    ).toHaveBeenCalledWith({ accountId: 1 });
  });

  it('deve retornar a lista de transações', async () => {
    const transactions: Transaction[] = [
      new Transaction({
        accountId: 12345,
        amount: 100,
        date: new Date('2023-07-29').toISOString(),
        sourceDestinationName: 'John Doe',
        status: TransactionStatus.PROCESSED,
        type: TransactionType.TRANSFER_IN,
        id: 'transactionId',
        transferId: 'transferId',
      }),
      new Transaction({
        accountId: 12345,
        amount: 50,
        date: new Date('2023-07-29').toISOString(),
        sourceDestinationName: 'Estabelecimento',
        status: TransactionStatus.PROCESSED,
        type: TransactionType.PURCHASE,
        id: 'transactionId',
        purchaseId: 'purchaseId',
      }),
    ];

    findAllTransactionsRepository.findAllTransactions.mockResolvedValue(
      transactions,
    );

    const result = await usecase.execute({ accountId: 1 });

    expect(result).toEqual(transactions);
    expect(
      findAllTransactionsRepository.findAllTransactions,
    ).toHaveBeenCalledTimes(1);
    expect(
      findAllTransactionsRepository.findAllTransactions,
    ).toHaveBeenCalledWith({ accountId: 1 });
  });
});
