import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './user/dto/user.dto';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
}
