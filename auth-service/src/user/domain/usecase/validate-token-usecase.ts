import { VerifyJwtService } from '../gateways/verify-jwt-service';

export class ValidateTokenUsecase {
  constructor(private verifyJwtService: VerifyJwtService) {}
  async execute(token: string) {
    const decodedToken = this.verifyJwtService.verify(token);

    return decodedToken;
  }
}
