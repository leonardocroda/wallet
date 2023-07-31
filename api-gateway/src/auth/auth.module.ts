import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthenticationService],
  controllers: [AuthController],
  exports: [AuthenticationService],
})
export class AuthModule {}
