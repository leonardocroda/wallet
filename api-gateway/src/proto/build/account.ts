export interface AccountService {
  GetBalance({
    accountId,
  }: {
    accountId: number;
  }): Promise<{ balance: number }>;
}
