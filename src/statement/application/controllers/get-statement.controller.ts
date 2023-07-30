import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { GetStatementUsecase } from '../../domain/usecase/get-statement-usecase';
import { Transaction } from 'src/statement/domain/entity/transaction.entity';
import { JwtAuthGuard } from 'src/user/infra/guards/jwt-auth.guard';

@Controller('transaction')
export class GetStatementController {
  constructor(private getStatementUsecase: GetStatementUsecase) {}

  @UseGuards(JwtAuthGuard)
  @Get(':accountId')
  async getOne(@Param('accountId') accountId: number): Promise<Transaction[]> {
    return this.getStatementUsecase.execute({ accountId });
  }
}
