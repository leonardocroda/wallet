import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceResponse {
  @ApiProperty()
  balance: number;
}

export class GetBalanceRequest {
  @ApiProperty()
  accountId: number;
}
