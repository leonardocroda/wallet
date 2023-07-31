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

config();

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountSchema]),
    ClientsModule.register([
      {
        name: 'SET_BALANCE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://guest:guest@${
              process.env.NODE_ENV === 'LOCAL' ? 'localhost' : 'rabbitmq'
            }:5672`,
          ],
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
  ],
  controllers: [SetBalanceController],
})
export class AccountModule {}
