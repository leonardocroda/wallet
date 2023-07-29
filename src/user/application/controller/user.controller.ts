import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { LocalAuthGuard } from '../../infra/guards/local-auth.guard';
import { LoginUsecase } from 'src/user/domain/usecase/login-usecase';
import { LoginDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private loginUsecase: LoginUsecase) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() login: LoginDto) {
    return this.loginUsecase.execute(login);
  }
}
