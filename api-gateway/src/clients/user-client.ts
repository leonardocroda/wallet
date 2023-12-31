import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from 'dotenv';
config();

export const userClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, '../proto/auth.proto'),
    loader: { keepCase: true },
    url: `${
      process.env.NODE_ENV === 'LOCAL' ? '0.0.0.0' : 'auth-service'
    }:50051`,
  },
};
