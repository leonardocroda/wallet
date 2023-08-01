import { LoginDto } from 'src/user/application/dto/user.dto';
import { GetUserByEmailRepository } from '../gateways/get-user-by-email-repository';
import { IJwtService } from '../gateways/jwt-service';

export class LoginUsecase {
  constructor(
    private jwtService: IJwtService,
    private getUserByEmailRepository: GetUserByEmailRepository,
  ) {}
  async execute(login: LoginDto) {
    const user = await this.getUserByEmailRepository.getUserByEmail(
      login.email,
    );

    if (!user || login.password !== user?.password) {
      return { access_token: 'invalid' };
    }

    const payload = {
      email: user.email,
      id: user.id,
      accountId: user.accountId,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
