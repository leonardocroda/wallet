import { SaveTransferInStatementUsecase } from './save-transfer-in-statement-usecase';
import { UpsertStatementTransactionRepository } from '../gateways/repositories/upsert-statement-transaction-repository';
import { TransferEntity } from '../entity/transfer.entity';
describe('SaveTransferInStatementUsecase', () => {
  let upsertStatementTransactionRepository: UpsertStatementTransactionRepository;
  let sut: SaveTransferInStatementUsecase;

  const mockTransfer: TransferEntity = {
    accountId: 12345,
    amount: 100,
    date: new Date('2023-07-29').toISOString(),
    sourceDestinationName: 'John Doe',
    status: 'PROCESSED',
    type: 'TRANSFER_IN',
    id: 'transfer-id',
  };

  beforeEach(() => {
    upsertStatementTransactionRepository = {
      upsertStatementTransaction: jest.fn(),
    };
    sut = new SaveTransferInStatementUsecase(
      upsertStatementTransactionRepository,
    );
  });
  it('should call upsertStatementTransaction with the correct transaction', async () => {
    await sut.execute(mockTransfer);

    expect(
      upsertStatementTransactionRepository.upsertStatementTransaction,
    ).toBeCalled();
  });

  it('should mapTransferToStatementTransaction correctly', () => {
    sut.execute(mockTransfer);
    const result = sut['mapTransferToStatementTransaction'](mockTransfer);

    expect(result).toEqual(
      expect.objectContaining({
        accountId: 12345,
        amount: 100,
        date: new Date('2023-07-29').toISOString(),
        sourceDestinationName: 'John Doe',
        status: 'PROCESSED',
        type: 'TRANSFER_IN',
        transferId: 'transfer-id',
      }),
    );
  });
});
