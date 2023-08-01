import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { AccountSchema } from './infra/db/typeorm/account-schema';
import { AccountTypeormRepository } from './infra/db/typeorm/account-typeorm-repository';
import { DataSource } from 'typeorm';
import { Account } from './domain/entity/account';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SetBalanceController } from './application/controllers/set-balance.controller';
import { SetBalanceUsecase } from './domain/usecase/set-balance-usecase';
import { SetBalanceRepository } from './domain/gateway/set-balance-repository';
import { config } from 'dotenv';
import { GetBalanceUsecase } from './domain/usecase/get-balance-usecase';
import { GetBalanceRepository } from './domain/gateway/get-balance-repository';
import { GetBalanceController } from './application/controllers/get-balance.controller';
import { rabbitMQConstants } from 'src/config/constants';

config();

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountSchema]),
    ClientsModule.register([
      {
        name: 'SET_BALANCE',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMQConstants.url],
          queue: 'SET_BALANCE',
          prefetchCount: 1,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: AccountTypeormRepository,
      useFactory: (datasource: DataSource) => {
        return new AccountTypeormRepository(datasource.getRepository(Account));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: SetBalanceUsecase,
      useFactory: (repository: SetBalanceRepository) => {
        return new SetBalanceUsecase(repository);
      },
      inject: [AccountTypeormRepository],
    },

    {
      provide: GetBalanceUsecase,
      useFactory: (repository: GetBalanceRepository) => {
        return new GetBalanceUsecase(repository);
      },
      inject: [AccountTypeormRepository],
    },
  ],
  controllers: [SetBalanceController, GetBalanceController],
})
export class AccountModule {}
