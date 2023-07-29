import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StatementSchema } from './statement/infra/db/typeorm/statement-schema';
import { StatementModule } from './statement/statement.module';
import { UserSchema } from './user/infra/db/typeorm/user-schema';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user_teste',
      password: 'senha_teste',
      database: 'wallet',
      entities: [UserSchema, StatementSchema],
    }),
    AuthModule,
    UserModule,
    StatementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
