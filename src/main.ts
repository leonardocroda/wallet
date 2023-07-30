import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'SET_BALANCE',
      prefetchCount: 1,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
