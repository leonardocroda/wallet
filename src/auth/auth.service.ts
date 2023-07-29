import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserByEmailUsecase } from '../user/domain/usecase/get-user-by-email-usecase';

@Injectable()
export class AuthService {
  constructor(
    private getUserByEmailUseCase: GetUserByEmailUsecase,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.getUserByEmailUseCase.getByEmail(email);

    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async decode(auth: string) {
    const token = auth.replace('Bearer ', '');
    return this.jwtService.decode(token, { json: true });
  }
}
