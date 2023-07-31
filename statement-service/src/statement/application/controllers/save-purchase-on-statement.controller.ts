import { Body, Controller } from '@nestjs/common';
import { SavePurchaseOnStatementUsecase } from '../../domain/usecase/save-purchase-on-statement-usecase';
import { SavePurchaseOnStatementDto } from '../dto/save-purchase-on-statement.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class SavePurchaseOnStatementController {
  constructor(
    private savePurchaseOnStatementUsecase: SavePurchaseOnStatementUsecase,
  ) {}

  @GrpcMethod('StatementService', 'SavePurchaseOnStatement')
  async savePurchaseOnStatement(@Body() purchase: SavePurchaseOnStatementDto) {
    return this.savePurchaseOnStatementUsecase.execute(
      purchase,
      purchase.accountId,
    );
  }
}
