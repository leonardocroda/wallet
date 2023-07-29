import { SaveTransferInUsecase } from './save-transfer-in-usecase';
import { UpsertTransactionRepository } from '../gateways/repositories/upsert-transaction-repository';
import { TransferEntity } from '../entity/transfer.entity';
describe('SaveTransferInStatementUsecase', () => {
  let upsertTransactionRepository: UpsertTransactionRepository;
  let sut: SaveTransferInUsecase;

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
    upsertTransactionRepository = {
      upsertTransaction: jest.fn(),
    };
    sut = new SaveTransferInUsecase(upsertTransactionRepository);
  });
  it('should call upsertStatementTransaction with the correct transaction', async () => {
    await sut.execute(mockTransfer);

    expect(upsertTransactionRepository.upsertTransaction).toBeCalled();
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
