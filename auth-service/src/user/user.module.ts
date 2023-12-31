import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { jwtConstants } from '../config/constants';
import { UserSchema } from './infra/db/typeorm/user-schema';
import { UserController } from './application/controller/user.controller';
import { User } from './domain/entity/user.entity';
import { GetUserByEmailRepository } from './domain/gateways/get-user-by-email-repository';
import { IJwtService } from './domain/gateways/jwt-service';
import { GetUserByEmailUsecase } from './domain/usecase/get-user-by-email-usecase';
import { LoginUsecase } from './domain/usecase/login-usecase';
import { ValidateUserUsecase } from './domain/usecase/validate-user-usecase';
import { UserTypeOrmRepository } from './infra/db/typeorm/user-typeorm-repository';
import { JwtStrategy } from './infra/guards/jwt.strategy';
import { LocalStrategy } from './infra/guards/local.strategy';
import { ValidateTokenUsecase } from './domain/usecase/validate-token-usecase';
import { VerifyJwtService } from './domain/gateways/verify-jwt-service';
import { VerifyJwtServiceImpl } from './infra/services/verify-jwt-service-impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
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
    {
      provide: LoginUsecase,
      useFactory: (
        jwtService: IJwtService,
        repository: GetUserByEmailRepository,
      ) => {
        return new LoginUsecase(jwtService, repository);
      },
      inject: [JwtService, UserTypeOrmRepository],
    },
    {
      provide: ValidateUserUsecase,
      useFactory: (getUserByEmailRepository: GetUserByEmailRepository) => {
        return new ValidateUserUsecase(getUserByEmailRepository);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: ValidateTokenUsecase,
      useFactory: (verifyJwtService: VerifyJwtService) => {
        return new ValidateTokenUsecase(verifyJwtService);
      },
      inject: [VerifyJwtServiceImpl],
    },
    LocalStrategy,
    VerifyJwtServiceImpl,
    JwtStrategy,
  ],
  exports: [GetUserByEmailUsecase],
  controllers: [UserController],
})
export class UserModule {}
