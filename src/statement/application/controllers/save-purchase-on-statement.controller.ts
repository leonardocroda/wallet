import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../../../user/infra/guards/jwt-auth.guard';
import { SavePurchaseOnStatementUsecase } from '../../domain/usecase/save-purchase-on-statement-usecase';
import { SavePurchaseOnStatementDto } from '../dto/save-purchase-on-statement.dto';

@Controller('transaction')
export class SavePurchaseOnStatementController {
  constructor(
    private savePurchaseOnStatementUsecase: SavePurchaseOnStatementUsecase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/purchase')
  async login(@Body() purchase: SavePurchaseOnStatementDto) {
    return this.savePurchaseOnStatementUsecase.execute(purchase);
  }
}
