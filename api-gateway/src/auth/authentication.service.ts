import {
  OnModuleInit,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { userClient } from '../clients/user-client';
import { AuthService, LoginDto, Token, User } from '../proto/build/auth';

@Injectable()
export class AuthenticationService implements OnModuleInit {
  @Client(userClient)
  private readonly client: ClientGrpc;

  private authService: AuthService;

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  async validateToken(request: Request) {
    const observable = (await this.authService.ValidateToken({
      access_token: request.headers.authorization,
    })) as unknown as Observable<User>;

    const token = await observable.toPromise();

    if (token.accountId && token.id && token.email) {
      return token;
    }
  }

  async login(login: LoginDto) {
    const observable = (await this.authService.Login(
      login,
    )) as unknown as Observable<Token>;
    const response = await observable.toPromise();

    if (response.access_token === 'invalid') {
      throw new UnauthorizedException();
    }

    return response;
  }
}
