import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';
import { Transaction } from 'src/statement/domain/entity/transaction.entity';
import { JwtAuthGuard } from 'src/user/infra/guards/jwt-auth.guard';
import { GetStatementUsecase } from '../../domain/usecase/get-statement-usecase';

@Controller('transaction')
export class GetStatementController {
  constructor(private getStatementUsecase: GetStatementUsecase) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOne(
    @Req() req: Request & { authorization: any },
  ): Promise<Transaction[]> {
    const accountId = req?.authorization?.accountId;
    return this.getStatementUsecase.execute({ accountId });
  }
}
