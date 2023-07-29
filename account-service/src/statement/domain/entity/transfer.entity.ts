export class TransferEntity {
  id: string;
  accountId: number;
  type: 'TRANSFER_IN' | 'TRANSFER_OUT';
  status: 'PROCESSING' | 'PROCESSED' | 'CANCELED';
  sourceDestinationName: string;
  date: string;
  amount: number;
}
