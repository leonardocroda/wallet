import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountServiceImpl } from './account.service';
import { AuthModule } from 'src/auth/auth.module';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'account',
          protoPath: join(__dirname, '..', 'proto/account.proto'),
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [AccountController],
  providers: [AccountServiceImpl],
})
export class AccountModule {}
