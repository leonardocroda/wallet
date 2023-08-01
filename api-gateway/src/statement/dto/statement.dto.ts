import { ApiProperty } from '@nestjs/swagger';

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

export class Purchase {
  @ApiProperty({ default: '2452da57-1406-40c8-a770-e7734f377f16' })
  id: string;

  @ApiProperty({ default: 1 })
  accountId: number;

  @ApiProperty({ default: '00.000.000/0001-10' })
  cnpj: string;

  @ApiProperty({ default: 'Loja Teste' })
  merchantName: string;

  @ApiProperty({ default: 10 })
  amount: number;

  @ApiProperty({ default: '2023-06-20T09:30:00.000Z' })
  date: string;

  @ApiProperty({ default: 'PURCHASE' })
  type: string;

  @ApiProperty({ default: 'PROCESSED' })
  status: string;
}

export class Transfer {
  @ApiProperty({ default: 'c96ae905-25f5-4468-a882-0c1d008e1730' })
  id: string;

  @ApiProperty({ default: 1 })
  accountId: number;

  @ApiProperty({ default: 'TRANSFER_IN' })
  type: string;

  @ApiProperty({ default: 'PROCESSED' })
  status: string;

  @ApiProperty({ default: 'Pessoa Teste' })
  sourceDestinationName: string;

  @ApiProperty({ default: '2023-04-20T09:30:00.000Z' })
  date: string;

  @ApiProperty({ default: 10 })
  amount: number;
}
