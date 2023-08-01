import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ default: 'teste@example.com' })
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({ default: 'senha123' })
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  access_token: string;
}
