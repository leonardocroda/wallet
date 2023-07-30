export enum TransferStatus {
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  CANCELED = 'CANCELED',
}

export enum TransferType {
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
}

export class TransferEntity {
  id: string;
  accountId: number;
  type: TransferType;
  status: TransferStatus;
  sourceDestinationName: string;
  date: string;
  amount: number;
}
