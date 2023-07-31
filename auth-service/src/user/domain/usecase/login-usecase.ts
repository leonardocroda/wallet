import { GetUserByEmailRepository } from '../gateways/get-user-by-email-repository';
import { IJwtService } from '../gateways/jwt-service';

export class LoginUsecase {
  constructor(
    private jwtService: IJwtService,
    private getUserByEmailRepository: GetUserByEmailRepository,
  ) {}
  async execute(user: any) {
    const { email, id, accountId } =
      await this.getUserByEmailRepository.getUserByEmail(user.email);

    const payload = { email, id, accountId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
