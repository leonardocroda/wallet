import { Body, Controller } from '@nestjs/common';
import { SaveTransferOnStatementUseCase } from '../../domain/usecase/save-transfer-on-statement-usecase';
import { SaveTransferOnStatementDto } from '../dto/save-transfer-on-statement.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class SaveTransferOnStatementController {
  constructor(
    private saveTransferOnStatementUsecase: SaveTransferOnStatementUseCase,
  ) {}

  @GrpcMethod('StatementService', 'SaveTransferOnStatement')
  async login(@Body() transfer: SaveTransferOnStatementDto) {
    return this.saveTransferOnStatementUsecase.execute(
      transfer,
      transfer.accountId,
    );
  }
}
