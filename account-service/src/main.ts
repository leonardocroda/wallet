import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { join } from 'path';
import { rabbitMQConstants } from './config/constants';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMQConstants.url],
      queue: 'SET_BALANCE',
      prefetchCount: 1,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, 'proto/account.proto'),
      url: '0.0.0.0:50053',
      loader: { keepCase: true },
      package: 'account',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
