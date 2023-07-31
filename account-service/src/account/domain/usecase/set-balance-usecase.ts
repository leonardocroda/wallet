import { SetBalanceRepository } from '../gateway/set-balance-repository';

export class SetBalanceUsecase {
  constructor(private setBalanceRepository: SetBalanceRepository) {}
  async execute({
    action,
    amount,
    accountId,
  }: {
    action: SetBalanceAction;
    amount: number;
    accountId: number;
  }) {
    await this.setBalanceRepository.setBalance({ action, amount, accountId });
  }
}

export enum SetBalanceAction {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}
