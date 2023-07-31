import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, 'proto/statement.proto'),
        loader: { keepCase: true },
        package: 'statement',
        url: '0.0.0.0:50052',
      },
    },
  );

  await app.listen();
}
bootstrap();
