import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { TransactionSchema } from './infra/db/typeorm/transaction-schema';
import { TransactionTypeOrmRepository } from './infra/db/typeorm/transaction-typeorm-repository';
import { DataSource } from 'typeorm';
import { Transaction } from './domain/entity/transaction.entity';
import { SaveTransferOnStatementUseCase } from './domain/usecase/save-transfer-on-statement-usecase';
import { UpsertTransactionRepository } from './domain/gateways/repositories/upsert-transaction-repository';
import { SaveTransferOnStatementController } from './application/controllers/save-transfer-on-statement.controller';
import { SetBalanceProducer } from './domain/gateways/producers/set-balance-producer';
import { SetBalanceProducerImpl } from './infra/queue/rabbitmq/set-balance-producer';

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
      provide: SetBalanceProducerImpl,
      useFactory: () => {
        return new SetBalanceProducerImpl();
      },
      inject: [],
    },
    {
      provide: SaveTransferOnStatementUseCase,
      useFactory: (
        repository: UpsertTransactionRepository,
        setBalanceProducer: SetBalanceProducer,
      ) => {
        return new SaveTransferOnStatementUseCase(
          repository,
          setBalanceProducer,
        );
      },
      inject: [TransactionTypeOrmRepository, SetBalanceProducerImpl],
    },
  ],
  controllers: [SaveTransferOnStatementController],
})
export class StatementModule {}
