import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionSchema } from './infra/db/typeorm/transaction-schema';

@Module({ imports: [TypeOrmModule.forFeature([TransactionSchema])] })
export class StatementModule {}
