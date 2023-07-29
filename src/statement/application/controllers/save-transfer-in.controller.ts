import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { SaveTransferInUsecase } from 'src/statement/domain/usecase/save-transfer-in-usecase';
import { JwtAuthGuard } from '../../../user/infra/guards/jwt-auth.guard';
import { TransferEntity } from 'src/statement/domain/entity/transfer.entity';

@Controller('transaction')
export class SaveTransferInController {
  constructor(private saveTransferInStatementUsecase: SaveTransferInUsecase) {}

  @UseGuards(JwtAuthGuard)
  @Post('/transfer-in')
  async login(@Body() transfer: TransferEntity) {
    return this.saveTransferInStatementUsecase.execute(transfer);
  }
}
