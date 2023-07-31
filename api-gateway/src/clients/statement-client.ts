import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from 'dotenv';

config();

export const statementClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'statement',
    protoPath: join(__dirname, '../proto/statement.proto'),
    loader: { keepCase: true },
    url: `${
      process.env.NODE_ENV === 'LOCAL' ? '0.0.0.0' : 'statement-service'
    }:50052`,
  },
};
