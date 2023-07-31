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
        protoPath: join(__dirname, 'proto/auth.proto'),
        url: '0.0.0.0:50051',
        loader: { keepCase: true },
        package: 'auth',
      },
    },
  );
  await app.listen();
}
bootstrap();
