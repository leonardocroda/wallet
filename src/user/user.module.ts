import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { UserSchema } from '../user/infra/db/typeorm/user-schema';
import { User } from './domain/entity/user.entity';
import { UserTypeOrmRepository } from './infra/db/typeorm/user-typeorm-repository';
import { DataSource } from 'typeorm';
import { GetUserByEmailUsecase } from './domain/usecase/get-user-by-email-usecase';
import { GetUserByEmailRepository } from './domain/gateways/get-user-by-email-repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [
    {
      provide: UserTypeOrmRepository,
      useFactory: (datasource: DataSource) => {
        return new UserTypeOrmRepository(datasource.getRepository(User));
      },
      inject: [getDataSourceToken()],
    },

    {
      provide: GetUserByEmailUsecase,
      useFactory: (repository: GetUserByEmailRepository) => {
        return new GetUserByEmailUsecase(repository);
      },
      inject: [UserTypeOrmRepository],
    },
  ],
  exports: [GetUserByEmailUsecase],
})
export class UserModule {}
