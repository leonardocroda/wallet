import { UpsertTransactionRepository } from '../gateways/repositories/upsert-transaction-repository';

import {
  TransactionStatus,
  TransactionType,
} from '../entity/transaction.entity';
import {
  SetBalanceAction,
  SetBalanceProducer,
} from '../gateways/producers/set-balance-producer';
import { SavePurchaseOnStatementUsecase } from './save-purchase-on-statement-usecase';
import {
  Purchase,
  PurchaseStatus,
  PurchaseType,
} from '../entity/purchase.entity';

describe('SavePurchaseOnStatementUsecase', () => {
  let upsertTransactionRepository: UpsertTransactionRepository;
  let setBalanceProducer: SetBalanceProducer;

  let sut: SavePurchaseOnStatementUsecase;

  const mockPurchase: Purchase = {
    accountId: 12345,
    amount: 100,
    date: new Date('2023-07-29').toISOString(),
    merchantName: 'Mc Donalds',
    status: PurchaseStatus.PROCESSED,
    type: PurchaseType.PURCHASE,
    id: 'purchase-id',
    cnpj: '00.000.000/0001-00',
  };

  beforeEach(() => {
    upsertTransactionRepository = {
      upsertTransaction: jest.fn(),
    };

    setBalanceProducer = {
      setBalance: jest.fn(),
    };
    sut = new SavePurchaseOnStatementUsecase(
      upsertTransactionRepository,
      setBalanceProducer,
    );
  });
  it('should call upsertStatementTransaction with the correct transaction', async () => {
    await sut.execute(mockPurchase, 1);

    expect(upsertTransactionRepository.upsertTransaction).toBeCalled();
  });

  it('should maPurchaseToStatementTransaction correctly', () => {
    sut.execute(mockPurchase, 1);
    const result = sut['mapPurchaseToTransaction'](mockPurchase);

    expect(result).toEqual(
      expect.objectContaining({
        accountId: 12345,
        amount: 100,
        date: new Date('2023-07-29').toISOString(),
        sourceDestinationName: mockPurchase.merchantName,
        status: TransactionStatus.PROCESSED,
        type: TransactionType.PURCHASE,
        externalId: 'purchase-id',
      }),
    );
  });

  it('should add balance when input is a REFUND', async () => {
    await sut.execute({ ...mockPurchase, type: PurchaseType.REFUND }, 1);

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.ADD,
        amount: mockPurchase.amount,
      }),
    );
  });

  it('should subtract balance when input is a PURCHASE', async () => {
    await sut.execute({ ...mockPurchase }, 1);

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.SUBTRACT,
        amount: mockPurchase.amount,
      }),
    );
  });

  it('should add balance when trasnfer status = CANCELED and type = PURCHASE', async () => {
    await sut.execute(
      {
        ...mockPurchase,
        status: PurchaseStatus.CANCELED,
        type: PurchaseType.PURCHASE,
      },
      1,
    );

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.ADD,
        amount: mockPurchase.amount,
      }),
    );
  });

  it('should subtract balance when trasnfer status = CANCELED and type = REFUND', async () => {
    await sut.execute(
      {
        ...mockPurchase,
        status: PurchaseStatus.CANCELED,
        type: PurchaseType.REFUND,
      },
      1,
    );

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.SUBTRACT,
        amount: mockPurchase.amount,
      }),
    );
  });
});
