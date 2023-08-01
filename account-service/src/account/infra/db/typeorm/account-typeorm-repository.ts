import { Repository } from 'typeorm';
import { Account } from '../../../domain/entity/account';
import { SetBalanceRepository } from '../../../domain/gateway/set-balance-repository';
import { SetBalanceAction } from '../../../domain/usecase/set-balance-usecase';
import { GetBalanceRepository } from 'src/account/domain/gateway/get-balance-repository';

export class AccountTypeormRepository
  implements SetBalanceRepository, GetBalanceRepository
{
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

  async getBalance({
    accountId,
  }: {
    accountId: number;
  }): Promise<{ balance: number }> {
    return this.repository.findOne({
      where: { id: accountId },
      // select: { balance: true, id: false, number: false },
    });
  }
}
