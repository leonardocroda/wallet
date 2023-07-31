import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { dataSourceOptions } from './config/datasource.config';
import { StatementModule } from './statement/statement.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), StatementModule],
  controllers: [AppController],
})
export class AppModule {}
