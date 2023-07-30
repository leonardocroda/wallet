import { JwtSignOptions } from '@nestjs/jwt';

export interface IJwtService {
  sign(payload: object | Buffer, options?: JwtSignOptions): string;
}
