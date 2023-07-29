export class Transaction {
  id: string;
  transferId?: string;
  purchaseId?: string;
  accountId: number;
  type: 'TRANSFER_IN' | 'TRANSFER_OUT' | 'PURCHASE' | 'REFUND';
  status: 'PROCESSING' | 'PROCESSED' | 'CANCELED';
  sourceDestinationName: string;
  date: string;
  amount: number;

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
    this.transferId = transaction.transferId;
    this.purchaseId = transaction.purchaseId;
    this.accountId = transaction.accountId;
    this.type = transaction.type;
    this.status = transaction.status;
    this.sourceDestinationName = transaction.sourceDestinationName;
    this.date = transaction.date;
    this.amount = transaction.amount;
    this.id = this.getId();
  }
}
