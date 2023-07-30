export enum PurchaseStatus {
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  CANCELED = 'CANCELED',
}

export enum PurchaseType {
  PURCHASE = 'PURCHASE',
  REFUND = 'REFUND',
}

export class Purchase {
  id: string;
  accountId: number;
  cnpj: string;
  merchantName: string;
  amount: number;
  date: string;
  type: PurchaseType;
  status: PurchaseStatus;
}
