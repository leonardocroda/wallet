export interface StatementService {
  GetAll(getAllDto: GetAllDto): Promise<Transaction[]>;
}

export interface GetAllDto {
  accountId: number;
}

export interface Transaction {
  id: string;
  transferId?: string;
  purchaseId?: string;
  type: string;
  status: string;
  sourceDestinationName: string;
  date: string;
  amount: number;
  accountId: number;
}
