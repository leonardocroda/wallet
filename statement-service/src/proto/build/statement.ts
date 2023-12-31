export interface StatementService {
  GetAll(getAllDto: GetAllDto): Promise<Transaction[]>;
  SavePurchaseOnStatement(purchase: Purchase): Promise<{ status: number }>;
  SaveTransferOnStatement(transfer: Transfer): Promise<{ status: number }>;
}

export interface GetAllDto {
  accountId: number;
}

export interface Transaction {
  id: string;
  externalId: string;
  type: string;
  status: string;
  sourceDestinationName: string;
  date: string;
  amount: number;
  accountId: number;
}

export interface Purchase {
  id: string;
  accountId: number;
  cnpj: string;
  merchantName: string;
  amount: number;
  date: string;
  type: string;
  status: string;
}

export interface Transfer {
  id: string;
  accountId: number;
  type: string;
  status: string;
  sourceDestinationName: string;
  date: string;
  amount: number;
}
