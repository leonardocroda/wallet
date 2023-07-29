import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema } from './infra/db/typeorm/account-schema';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema])],
})
export class AccountModule {}
