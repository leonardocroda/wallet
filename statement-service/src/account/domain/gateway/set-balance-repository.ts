import { SetBalanceAction } from '../usecase/set-balance-usecase';

export interface SetBalanceRepository {
  setBalance({
    action,
    amount,
    accountId,
  }: {
    action: SetBalanceAction;
    amount: number;
    accountId: number;
  }): Promise<void>;
}
