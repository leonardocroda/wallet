import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './config/datasource.config';
import { StatementModule } from './statement/statement.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    StatementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
