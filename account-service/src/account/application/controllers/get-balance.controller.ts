import { Controller, Body } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetBalanceUsecase } from 'src/account/domain/usecase/get-balance-usecase';

@Controller()
export class GetBalanceController {
  constructor(private readonly getBalanceUsecase: GetBalanceUsecase) {}

  @GrpcMethod('AccountService', 'GetBalance')
  async getBalance(@Body() { accountId }) {
    return this.getBalanceUsecase.execute({ accountId });
  }
}
