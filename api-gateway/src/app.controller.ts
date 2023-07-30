import { Controller, Post, OnModuleInit, Body, Req } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { userClient } from './clients/user-client';
import { LoginDto, Token, AuthService } from './proto/build/auth';
import { Request } from 'express';

@Controller('auth')
export class AppController implements OnModuleInit {
  @Client(userClient)
  private readonly client: ClientGrpc;

  private authService: AuthService;

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Post('/login')
  async login(@Body() login: LoginDto): Promise<Token> {
    return this.authService.Login(login);
  }

  @Post('/verify')
  async verify(@Req() request: Request) {
    return this.authService.ValidateToken({
      access_token: request.headers.authorization,
    });
  }
}
