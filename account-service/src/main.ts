import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { join } from 'path';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://guest:guest@${
          process.env.NODE_ENV === 'LOCAL' ? 'localhost' : 'rabbitmq'
        }:5672`,
      ],
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
