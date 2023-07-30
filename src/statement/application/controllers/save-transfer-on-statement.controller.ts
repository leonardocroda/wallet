import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { SaveTransferOnStatementUseCase } from '../../domain/usecase/save-transfer-on-statement-usecase';
import { JwtAuthGuard } from '../../../user/infra/guards/jwt-auth.guard';
import { SaveTransferOnStatementDto } from '../dto/save-transfer-on-statement.dto';

@Controller('transaction')
export class SaveTransferOnStatementController {
  constructor(
    private saveTransferOnStatementUsecase: SaveTransferOnStatementUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/transfer')
  async login(@Body() transfer: SaveTransferOnStatementDto) {
    return this.saveTransferOnStatementUsecase.execute(transfer);
  }
}
