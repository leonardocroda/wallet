import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { TransactionSchema } from './infra/db/typeorm/transaction-schema';
import { TransactionTypeOrmRepository } from './infra/db/typeorm/transaction-typeorm-repository';
import { DataSource } from 'typeorm';
import { Transaction } from './domain/entity/transaction.entity';
import { SaveTransferInUsecase } from './domain/usecase/save-transfer-in-usecase';
import { UpsertTransactionRepository } from './domain/gateways/repositories/upsert-transaction-repository';
import { SaveTransferInController } from './application/controllers/save-transfer-in.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionSchema])],
  providers: [
    {
      provide: TransactionTypeOrmRepository,
      useFactory: (datasource: DataSource) => {
        return new TransactionTypeOrmRepository(
          datasource.getRepository(Transaction),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: SaveTransferInUsecase,
      useFactory: (repository: UpsertTransactionRepository) => {
        return new SaveTransferInUsecase(repository);
      },
      inject: [TransactionTypeOrmRepository],
    },
  ],
  controllers: [SaveTransferInController],
})
export class StatementModule {}
