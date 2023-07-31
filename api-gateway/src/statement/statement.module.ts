import { Module } from '@nestjs/common';
import { StatementController } from './statement.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

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
  ],
  controllers: [StatementController],
})
export class StatementModule {}
