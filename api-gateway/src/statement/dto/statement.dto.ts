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
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountId: number;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  merchantName: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  status: string;
}

export class Transfer {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountId: number;

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
}
