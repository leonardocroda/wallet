import { ClientOptions, Transport } from '@nestjs/microservices';

export const userClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: '../proto/user.proto',
    loader: { keepCase: true },
  },
};
