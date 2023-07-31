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
  transferId?: string;
  purchaseId?: string;
  type: TransactionType;
  status: TransactionStatus;
  sourceDestinationName: string;
  date: string;
  amount: number;
  accountId: number;

  private getId() {
    if (this.type === 'TRANSFER_IN' || this.type === 'TRANSFER_OUT') {
      return Buffer.from(
        `${this.transferId}#${this.accountId}#${this.date}#${this.amount}#${this.sourceDestinationName}`,
      ).toString('base64');
    }

    if (this.type === 'PURCHASE' || this.type === 'REFUND') {
      return Buffer.from(
        `${this.purchaseId}#${this.accountId}#${this.date}#${this.amount}#${this.sourceDestinationName}`,
      ).toString('base64');
    }
  }

  constructor(transaction: Partial<Transaction>) {
    this.transferId = transaction?.transferId;
    this.purchaseId = transaction?.purchaseId;
    this.type = transaction?.type;
    this.status = transaction?.status;
    this.sourceDestinationName = transaction?.sourceDestinationName;
    this.date = transaction?.date;
    this.amount = transaction?.amount;
    this.accountId = transaction?.accountId;
    this.id = transaction?.id ?? this?.getId();
  }
}
