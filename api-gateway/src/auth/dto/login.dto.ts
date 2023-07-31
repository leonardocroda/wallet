import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ default: 'test@example.com' })
  email: string;

  @ApiProperty({ default: 'senha123' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
}
