import { Module } from '@nestjs/common';
import { StatementController } from './statement.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TransactionsService } from './transactios.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STATEMENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'statement',
          protoPath: join(__dirname, '..', 'proto/statement.proto'),
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [StatementController],
  providers: [TransactionsService],
})
export class StatementModule {}
