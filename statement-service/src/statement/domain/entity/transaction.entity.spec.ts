import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from './transaction.entity';

describe('Transaction', () => {
  it('should generate a valid id for TRANSFER_IN type', () => {
    const transactionData = {
      transferId: 'transfer-123',
      accountId: 456,
      type: TransactionType.TRANSFER_IN,
      status: TransactionStatus.PROCESSING,
      sourceDestinationName: 'John Doe',
      date: '2023-07-29',
      amount: 100,
    };

    const transaction = new Transaction(transactionData);
    const expectedId = Buffer.from(
      'transfer-123#456#2023-07-29#100#John Doe',
    ).toString('base64');

    expect(transaction.id).toEqual(expectedId);
  });

  it('should generate a valid id for PURCHASE type', () => {
    const transactionData = {
      purchaseId: 'purchase-789',
      accountId: 123,
      type: TransactionType.PURCHASE,
      status: TransactionStatus.PROCESSED,
      sourceDestinationName: 'Jane Smith',
      date: '2023-07-30',
      amount: 50,
    };

    const transaction = new Transaction(transactionData);
    const expectedId = Buffer.from(
      'purchase-789#123#2023-07-30#50#Jane Smith',
    ).toString('base64');

    expect(transaction.id).toEqual(expectedId);
  });

  it('should not generate id for unknown type', () => {
    const transactionData = {
      accountId: 789,
      type: 'UNKNOWN_TYPE' as TransactionType,
      status: TransactionStatus.CANCELED,
      sourceDestinationName: 'Unknown Entity',
      date: '2023-07-31',
      amount: 200,
    };

    const transaction = new Transaction(transactionData);

    expect(transaction.id).toBeUndefined();
  });
});
