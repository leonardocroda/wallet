import { GetBalanceRepository } from '../gateway/get-balance-repository';
import { GetBalanceUsecase } from './get-balance-usecase';

const mockGetBalanceRepository: GetBalanceRepository = {
  getBalance: jest.fn(async () => {
    return { balance: 1000 };
  }),
};

describe('GetBalanceUsecase', () => {
  it('should return the balance for a valid accountId', async () => {
    const usecase = new GetBalanceUsecase(mockGetBalanceRepository);
    const accountId = 1;

    const { balance } = await usecase.execute({ accountId });

    expect(balance).toBe(1000);
  });
});
