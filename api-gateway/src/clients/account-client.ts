import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from 'dotenv';

config();

export const accountClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'account',
    protoPath: join(__dirname, '../proto/account.proto'),
    loader: { keepCase: true },
    url: `${
      process.env.NODE_ENV === 'LOCAL' ? '0.0.0.0' : 'account-service'
    }:50053`,
  },
};
