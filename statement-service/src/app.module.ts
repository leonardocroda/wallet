import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { dataSourceOptions } from './config/datasource.config';
import { StatementModule } from './statement/statement.module';
import { JwtMiddleware } from './shared/middlewares/jwt.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), StatementModule],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/transaction/*');
  }
}
