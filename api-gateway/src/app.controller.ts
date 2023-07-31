import { Controller, Post, OnModuleInit, Body, Req, Res } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { userClient } from './clients/user-client';
import { LoginDto, Token, AuthService, User } from './proto/build/auth';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

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
  async verify(@Req() request: Request, @Res() response: Response) {
    try {
      const observable = (await this.authService.ValidateToken({
        access_token: request.headers.authorization,
      })) as unknown as Observable<User>;

      const token = await observable.toPromise();

      if (token.accountId && token.id && token.email) {
        return response.status(200).json(token);
      } else {
        return response.status(401).send();
      }
    } catch (err) {
      return response.status(401).send();
    }
  }
}
