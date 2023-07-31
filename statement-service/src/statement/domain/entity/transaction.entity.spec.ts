import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from './transaction.entity';

describe('Transaction', () => {
  it('should generate a valid id', () => {
    const transactionData = {
      externalId: 'transfer-123',
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
});
