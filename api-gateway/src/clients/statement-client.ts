import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const statementClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'statement',
    protoPath: join(__dirname, '../proto/statement.proto'),
    loader: { keepCase: true },
  },
};
