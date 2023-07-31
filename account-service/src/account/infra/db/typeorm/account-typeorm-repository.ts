import { Repository } from 'typeorm';
import { Account } from '../../../domain/entity/account';
import { SetBalanceRepository } from '../../../domain/gateway/set-balance-repository';
import { SetBalanceAction } from '../../../domain/usecase/set-balance-usecase';

export class AccountTypeormRepository implements SetBalanceRepository {
  constructor(private repository: Repository<Account>) {}

  async setBalance({
    action,
    amount,
    accountId,
  }: {
    action: SetBalanceAction;
    amount: number;
    accountId: number;
  }): Promise<void> {
    const operation = action === SetBalanceAction.ADD ? '+' : '-';

    await this.repository
      .createQueryBuilder()
      .update(Account)
      .set({ balance: () => `balance ${operation} ${amount}` })
      .where('id = :accountId', { accountId })
      .execute();
  }
}
