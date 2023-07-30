import { Body, Controller, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../../../user/infra/guards/jwt-auth.guard';
import { SavePurchaseOnStatementUsecase } from '../../domain/usecase/save-purchase-on-statement-usecase';
import { SavePurchaseOnStatementDto } from '../dto/save-purchase-on-statement.dto';
import { Request } from 'express';

@Controller('transaction')
export class SavePurchaseOnStatementController {
  constructor(
    private savePurchaseOnStatementUsecase: SavePurchaseOnStatementUsecase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/purchase')
  async login(
    @Body() purchase: SavePurchaseOnStatementDto,
    @Req() req: Request & { authorization: any },
  ) {
    return this.savePurchaseOnStatementUsecase.execute(
      purchase,
      req.authorization.accountId,
    );
  }
}
