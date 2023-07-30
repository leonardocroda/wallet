import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  SetBalanceAction,
  SetBalanceUsecase,
} from '../../domain/usecase/set-balance-usecase';
import { Controller } from '@nestjs/common';

@Controller()
export class SetBalanceController {
  constructor(private setBalanceUseCase: SetBalanceUsecase) {}

  @MessagePattern('SET_BALANCE')
  async setBalance(
    @Payload()
    {
      accountId,
      action,
      amount,
    }: {
      accountId: number;
      action: SetBalanceAction;
      amount: number;
    },
  ) {
    await this.setBalanceUseCase.execute({
      accountId,
      action,
      amount,
    });
  }
}
