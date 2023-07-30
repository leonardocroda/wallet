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
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { SavePurchaseOnStatementController } from './application/controllers/save-purchase-on-statement.controller';
import { SavePurchaseOnStatementUsecase } from './domain/usecase/save-purchase-on-statement-usecase';
import { GetStatementUsecase } from './domain/usecase/get-statement-usecase';
import { FindAllTransactionsRepository } from './domain/gateways/repositories/find-all-transactions-repository';
import { GetStatementController } from './application/controllers/get-statement.controller';

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
        const clientProxy = ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://guest:guest@localhost:5672'],
            queue: 'SET_BALANCE',
            prefetchCount: 1,
            queueOptions: {
              durable: true,
            },
          },
        });
        return new SetBalanceProducerImpl(clientProxy);
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

    {
      provide: SavePurchaseOnStatementUsecase,
      useFactory: (
        repository: UpsertTransactionRepository,
        setBalanceProducer: SetBalanceProducer,
      ) => {
        return new SavePurchaseOnStatementUsecase(
          repository,
          setBalanceProducer,
        );
      },
      inject: [TransactionTypeOrmRepository, SetBalanceProducerImpl],
    },

    {
      provide: GetStatementUsecase,
      useFactory: (
        findAllTransactionsRepository: FindAllTransactionsRepository,
      ) => {
        return new GetStatementUsecase(findAllTransactionsRepository);
      },
      inject: [TransactionTypeOrmRepository],
    },
  ],
  controllers: [
    SaveTransferOnStatementController,
    SavePurchaseOnStatementController,
    GetStatementController,
  ],
})
export class StatementModule {}
