export enum TransactionType {
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  PURCHASE = 'PURCHASE',
  REFUND = 'REFUND',
}

export enum TransactionStatus {
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  CANCELED = 'CANCELED',
}

export class Transaction {
  id: string;
  externalId: string;
  type: TransactionType;
  status: TransactionStatus;
  sourceDestinationName: string;
  date: string;
  amount: number;
  accountId: number;

  private getId() {
    return Buffer.from(
      `${this.externalId}#${this.accountId}#${this.date}#${this.amount}#${this.sourceDestinationName}`,
    ).toString('base64');
  }

  constructor(transaction: Partial<Transaction>) {
    this.externalId = transaction?.externalId;
    this.type = transaction?.type;
    this.status = transaction?.status;
    this.sourceDestinationName = transaction?.sourceDestinationName;
    this.date = transaction?.date;
    this.amount = transaction?.amount;
    this.accountId = transaction?.accountId;
    this.id = transaction?.id ?? this?.getId();
  }
}
