import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({ default: 'teste@example.com' })
  email: string;

  @ApiProperty({ default: 'senha123' })
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  access_token: string;
}
