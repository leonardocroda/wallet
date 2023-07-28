import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { UserTypeOrmRepository } from 'src/@core/infra/db/typeorm/user-typeorm-repository';
import { DataSource } from 'typeorm';
import { UserSchema } from '../@core/infra/db/typeorm/user-schema';
import { User } from '../@core/domain/user/entity/users.entity';
import { GetUserByEmailUsecase } from '../@core/domain/user/usecase/get-user-by-email-usecase';
import { GetUserByEmailRepository } from '../@core/domain/user/gateways/get-user-by-email-repository';

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
export class UsersModule {}
