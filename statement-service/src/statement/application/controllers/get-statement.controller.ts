import { Controller, Body } from '@nestjs/common';

import { Transaction } from 'src/statement/domain/entity/transaction.entity';
import { GetStatementUsecase } from '../../domain/usecase/get-statement-usecase';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class GetStatementController {
  constructor(private getStatementUsecase: GetStatementUsecase) {}

  @GrpcMethod('StatementService', 'GetAll')
  async getAll(
    @Body() data: { accountId: number },
  ): Promise<{ transactions: Transaction[] }> {
    return this.getStatementUsecase.execute({ accountId: data.accountId });
  }
}
