import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/datasource.config';
import { AccountModule } from './account/account.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
