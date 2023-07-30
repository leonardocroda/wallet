import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  PurchaseStatus,
  PurchaseType,
} from '../../domain/entity/purchase.entity';

export class SavePurchaseOnStatementDto {
  @IsUUID('4')
  id: string;

  @IsNumber()
  accountId: number;

  @IsString()
  cnpj: string;

  @IsString()
  merchantName: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsEnum(PurchaseType)
  type: PurchaseType;

  @IsEnum(PurchaseStatus)
  status: PurchaseStatus;
}
