import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNumber,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class Transaction {
  @ApiProperty()
  id: string;

  @ApiProperty()
  externalId: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  sourceDestinationName: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  accountId: number;
}

export enum PurchaseStatus {
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  CANCELED = 'CANCELED',
}

export enum PurchaseType {
  PURCHASE = 'PURCHASE',
  REFUND = 'REFUND',
}
export class Purchase {
  @IsUUID('4')
  @ApiProperty({ default: '2452da57-1406-40c8-a770-e7734f377f16' })
  id: string;

  @IsNumber()
  @ApiProperty({ default: 1 })
  accountId: number;

  @IsString()
  @ApiProperty({ default: '00.000.000/0001-10' })
  cnpj: string;

  @IsString()
  @ApiProperty({ default: 'Loja Teste' })
  merchantName: string;

  @IsNumber()
  @ApiProperty({ default: 10 })
  amount: number;

  @IsDateString()
  @ApiProperty({ default: '2023-06-20T09:30:00.000Z' })
  date: string;

  @IsEnum(PurchaseType)
  @ApiProperty({ default: 'PURCHASE' })
  type: string;

  @IsEnum(PurchaseStatus)
  @ApiProperty({ default: 'PROCESSED' })
  status: string;
}

export enum TransferStatus {
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  CANCELED = 'CANCELED',
}

export enum TransferType {
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
}

export class Transfer {
  @IsUUID('4')
  @ApiProperty({ default: 'c96ae905-25f5-4468-a882-0c1d008e1730' })
  id: string;

  @IsNumber()
  @ApiProperty({ default: 1 })
  accountId: number;

  @IsEnum(TransferType)
  @ApiProperty({ default: 'TRANSFER_IN' })
  type: string;

  @IsEnum(TransferStatus)
  @ApiProperty({ default: 'PROCESSED' })
  status: string;

  @IsString()
  @ApiProperty({ default: 'Pessoa Teste' })
  sourceDestinationName: string;

  @IsDateString()
  @ApiProperty({ default: '2023-04-20T09:30:00.000Z' })
  date: string;

  @IsNumber()
  @ApiProperty({ default: 10 })
  amount: number;
}
