import { GetBalanceRepository } from '../gateway/get-balance-repository';

export class GetBalanceUsecase {
  constructor(private getBalanceRepository: GetBalanceRepository) {}

  async execute({ accountId }: { accountId: number }) {
    return this.getBalanceRepository.getBalance({ accountId });
  }
}
