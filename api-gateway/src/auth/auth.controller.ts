import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LoginDto, Token } from '../proto/build/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('/login')
  async login(@Body() login: LoginDto): Promise<Token> {
    return this.authService.login(login);
  }

  @Post('/verify')
  async verify(@Req() request: Request, @Res() response: Response) {
    const token = await this.authService.validateToken(request);

    if (token) {
      return response.status(200).json(token);
    } else {
      return response.status(401).send();
    }
  }
}
