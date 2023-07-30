import { Body, Controller } from '@nestjs/common';
// import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
// import { LocalAuthGuard } from '../../infra/guards/local-auth.guard';
import { LoginUsecase } from 'src/user/domain/usecase/login-usecase';
import { LoginDto } from '../dto/user.dto';
import { GrpcMethod } from '@nestjs/microservices';
@Controller()
export class UserController {
  constructor(private loginUsecase: LoginUsecase) {}

  // @Post('/login')
  // @UseGuards(LocalAuthGuard)
  @GrpcMethod('AuthService', 'Login')
  async login(@Body() login: LoginDto) {
    const response = await this.loginUsecase.execute(login);
    console.log(response);
    return response;
  }
}
