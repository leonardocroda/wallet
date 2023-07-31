import { Controller, Get, Req } from '@nestjs/common';

import { Request } from 'express';
import { Transaction } from 'src/statement/domain/entity/transaction.entity';
import { GetStatementUsecase } from '../../domain/usecase/get-statement-usecase';

@Controller('transaction')
export class GetStatementController {
  constructor(private getStatementUsecase: GetStatementUsecase) {}

  @Get()
  async getOne(
    @Req() req: Request & { authorization: any },
  ): Promise<Transaction[]> {
    const accountId = req?.authorization?.accountId;
    return this.getStatementUsecase.execute({ accountId });
  }
}
