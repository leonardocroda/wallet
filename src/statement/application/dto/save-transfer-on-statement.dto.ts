import {
  IsUUID,
  IsNumber,
  IsEnum,
  IsDateString,
  IsString,
} from 'class-validator';
import {
  TransferStatus,
  TransferType,
} from 'src/statement/domain/entity/transfer.entity';

export class SaveTransferOnStatementDto {
  @IsUUID()
  id: string;

  @IsNumber()
  accountId: number;

  @IsEnum(TransferStatus)
  status: TransferStatus;

  @IsEnum(TransferType)
  type: TransferType;

  @IsString()
  sourceDestinationName: string;

  @IsDateString()
  date: string;

  @IsNumber()
  amount: number;
}
