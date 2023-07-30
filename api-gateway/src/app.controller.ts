import { Controller, Post, OnModuleInit, Body } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { userClient } from './clients/user-client';
import { LoginDto, Token, UserService } from './proto/build/user';
import { Observable } from 'rxjs';

@Controller('auth')
export class AppController implements OnModuleInit {
  @Client(userClient)
  private readonly client: ClientGrpc;

  private userService: UserService;

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Post('/login')
  async login(@Body() login: LoginDto): Promise<Token> {
    return this.userService.Login(login);
  }
}
