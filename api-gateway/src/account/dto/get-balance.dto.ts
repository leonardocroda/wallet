import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetBalanceResponse {
  @ApiProperty()
  balance: number;
}

export class GetBalanceRequest {
  @IsNumber()
  @ApiProperty({ default: 1 })
  accountId: number;
}
