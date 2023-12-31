import { SaveTransferOnStatementUseCase } from './save-transfer-on-statement-usecase';
import { UpsertTransactionRepository } from '../gateways/repositories/upsert-transaction-repository';
import {
  TransferEntity,
  TransferStatus,
  TransferType,
} from '../entity/transfer.entity';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../entity/transaction.entity';
import {
  SetBalanceAction,
  SetBalanceProducer,
} from '../gateways/producers/set-balance-producer';
import { FindOneTransactionRepository } from '../gateways/repositories/find-one-transaction-repository';

describe('SaveTransferOnStatementUsecase', () => {
  let upsertTransactionRepository: UpsertTransactionRepository;
  let setBalanceProducer: SetBalanceProducer;
  let findOneTransactionRepository: FindOneTransactionRepository;

  let sut: SaveTransferOnStatementUseCase;
  const mockTransfer: TransferEntity = {
    accountId: 12345,
    amount: 100,
    date: new Date('2023-07-29').toISOString(),
    sourceDestinationName: 'John Doe',
    status: TransferStatus.PROCESSED,
    type: TransferType.TRANSFER_IN,
    id: 'transfer-id',
  };

  beforeEach(() => {
    upsertTransactionRepository = {
      upsertTransaction: jest.fn(),
    };

    setBalanceProducer = {
      setBalance: jest.fn(),
    };

    findOneTransactionRepository = {
      findOne: jest.fn(),
    };

    sut = new SaveTransferOnStatementUseCase(
      upsertTransactionRepository,
      setBalanceProducer,
      findOneTransactionRepository,
    );
  });
  it('should call upsertStatementTransaction with the correct transaction', async () => {
    const { status } = await sut.execute(mockTransfer, 1);
    expect(status).toBe(201);
    expect(upsertTransactionRepository.upsertTransaction).toBeCalled();
  });

  it('should mapTransferToStatementTransaction correctly', () => {
    sut.execute(mockTransfer, 1);
    const result = sut['mapTransferToTransaction'](mockTransfer);

    expect(result).toEqual(
      expect.objectContaining({
        accountId: 12345,
        amount: 100,
        date: new Date('2023-07-29').toISOString(),
        sourceDestinationName: 'John Doe',
        status: TransactionStatus.PROCESSED,
        type: TransactionType.TRANSFER_IN,
        externalId: 'transfer-id',
      }),
    );
  });

  it('should add balance when input is a TRANSFER_IN', async () => {
    await sut.execute(mockTransfer, 1);

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.ADD,
        amount: mockTransfer.amount,
      }),
    );
  });

  it('should subtract balance when input is a TRANSFER_OUT', async () => {
    await sut.execute({ ...mockTransfer, type: TransferType.TRANSFER_OUT }, 1);

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.SUBTRACT,
        amount: mockTransfer.amount,
      }),
    );
  });

  it('should add balance when trasnfer status = CANCELED and type = TRANSFER_OUT', async () => {
    await sut.execute(
      {
        ...mockTransfer,
        status: TransferStatus.CANCELED,
        type: TransferType.TRANSFER_OUT,
      },
      1,
    );

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.ADD,
        amount: mockTransfer.amount,
      }),
    );
  });

  it('should subtract balance when trasnfer status = CANCELED and type = TRANSFER_IN', async () => {
    await sut.execute(
      {
        ...mockTransfer,
        status: TransferStatus.CANCELED,
        type: TransferType.TRANSFER_IN,
      },
      1,
    );

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.SUBTRACT,
        amount: mockTransfer.amount,
      }),
    );
  });

  it('should not save the transaction or change the balance if the transaction is duplicated', async () => {
    jest
      .spyOn(findOneTransactionRepository, 'findOne')
      .mockImplementationOnce(async (_) => {
        return new Transaction({
          accountId: 12345,
          amount: 100,
          date: new Date('2023-07-29').toISOString(),
          sourceDestinationName: 'John Doe',
          status: TransactionStatus.PROCESSED,
          type: TransactionType.TRANSFER_IN,
          id: 'transactionId',
          externalId: 'transferId',
        });
      });

    const { status } = await sut.execute(mockTransfer, 1);

    expect(upsertTransactionRepository.upsertTransaction).not.toBeCalled();
    expect(setBalanceProducer.setBalance).not.toBeCalled();
    expect(status).toBe(409);
  });
});
