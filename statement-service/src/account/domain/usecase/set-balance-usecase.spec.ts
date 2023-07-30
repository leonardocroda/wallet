import { SetBalanceUsecase, SetBalanceAction } from './set-balance-usecase';
import { SetBalanceRepository } from '../gateway/set-balance-repository';

const setBalanceRepositoryMock: jest.Mocked<SetBalanceRepository> = {
  setBalance: jest.fn(),
};

describe('SetBalanceUsecase', () => {
  let setBalanceUsecase: SetBalanceUsecase;

  beforeEach(() => {
    setBalanceUsecase = new SetBalanceUsecase(setBalanceRepositoryMock);
  });

  it('should call setBalanceRepository with correct arguments for ADD action', async () => {
    const accountId = 123;
    const amount = 100;
    const action = SetBalanceAction.ADD;

    await setBalanceUsecase.execute({ accountId, amount, action });

    expect(setBalanceRepositoryMock.setBalance).toHaveBeenCalledWith({
      action: SetBalanceAction.ADD,
      amount: 100,
      accountId: 123,
    });
  });

  it('should call setBalanceRepository with correct arguments for SUBTRACT action', async () => {
    const accountId = 456;
    const amount = 50;
    const action = SetBalanceAction.SUBTRACT;

    await setBalanceUsecase.execute({ accountId, amount, action });

    expect(setBalanceRepositoryMock.setBalance).toHaveBeenCalledWith({
      action: SetBalanceAction.SUBTRACT,
      amount: 50,
      accountId: 456,
    });
  });
});
