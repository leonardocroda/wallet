import { Body, Controller } from '@nestjs/common';
import { LoginUsecase } from 'src/user/domain/usecase/login-usecase';
import { LoginDto } from '../dto/user.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { ValidateTokenUsecase } from 'src/user/domain/usecase/validate-token-usecase';
@Controller()
export class UserController {
  constructor(
    private loginUsecase: LoginUsecase,
    private validateTokenUseCase: ValidateTokenUsecase,
  ) {}

  @GrpcMethod('AuthService', 'Login')
  async login(@Body() login: LoginDto) {
    const response = await this.loginUsecase.execute(login);
    return response;
  }

  @GrpcMethod('AuthService', 'ValidateToken')
  async verifyUser(@Body() { access_token }: { access_token: string }) {
    const response = await this.validateTokenUseCase.execute(access_token);
    return response;
  }
}
