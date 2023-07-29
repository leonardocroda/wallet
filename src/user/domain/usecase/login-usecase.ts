import { IJwtService } from '../gateways/jwt-service';

export class LoginUsecase {
  constructor(private jwtService: IJwtService) {}
  execute(user: any) {
    console.log(user);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
