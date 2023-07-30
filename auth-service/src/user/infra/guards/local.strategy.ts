import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserUsecase } from '../../domain/usecase/validate-user-usecase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUsecase: ValidateUserUsecase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.validateUserUsecase.execute(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
