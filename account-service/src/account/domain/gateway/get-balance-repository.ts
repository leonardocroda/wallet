export interface GetBalanceRepository {
  getBalance({
    accountId,
  }: {
    accountId: number;
  }): Promise<{ balance: number }>;
}
