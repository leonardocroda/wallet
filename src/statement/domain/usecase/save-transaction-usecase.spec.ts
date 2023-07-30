import { SaveTransferOnStatementUseCase } from './save-transfer-on-statement-usecase';
import { UpsertTransactionRepository } from '../gateways/repositories/upsert-transaction-repository';
import {
  TransferEntity,
  TransferStatus,
  TransferType,
} from '../entity/transfer.entity';
import {
  TransactionStatus,
  TransactionType,
} from '../entity/transaction.entity';
import {
  SetBalanceAction,
  SetBalanceProducer,
} from '../gateways/producers/set-balance-producer';

describe('SaveTransferInStatementUsecase', () => {
  let upsertTransactionRepository: UpsertTransactionRepository;
  let setBalanceProducer: SetBalanceProducer;

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
    sut = new SaveTransferOnStatementUseCase(
      upsertTransactionRepository,
      setBalanceProducer,
    );
  });
  it('should call upsertStatementTransaction with the correct transaction', async () => {
    await sut.execute(mockTransfer);

    expect(upsertTransactionRepository.upsertTransaction).toBeCalled();
  });

  it('should mapTransferToStatementTransaction correctly', () => {
    sut.execute(mockTransfer);
    const result = sut['mapTransferToTransaction'](mockTransfer);

    expect(result).toEqual(
      expect.objectContaining({
        accountId: 12345,
        amount: 100,
        date: new Date('2023-07-29').toISOString(),
        sourceDestinationName: 'John Doe',
        status: TransactionStatus.PROCESSED,
        type: TransactionType.TRANSFER_IN,
        transferId: 'transfer-id',
      }),
    );
  });

  it('should add balance when input is a TRANSFER_IN', async () => {
    await sut.execute(mockTransfer);

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.ADD,
        amount: mockTransfer.amount,
      }),
    );
  });

  it('should subtract balance when input is a TRANSFER_OUT', async () => {
    await sut.execute({ ...mockTransfer, type: TransferType.TRANSFER_OUT });

    expect(setBalanceProducer.setBalance).toBeCalledWith(
      expect.objectContaining({
        action: SetBalanceAction.SUBTRACT,
        amount: mockTransfer.amount,
      }),
    );
  });
});
