import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GrpcContext } from 'grpc-passport-jwt';

@Injectable()
export class JwtGrpcGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GrpcContext.create(context);
    const metadata = ctx.getMetadata();

    const token = metadata['authorization'][0].split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      ctx.switchToRpc().getContext().user = decoded; // Store the decoded JWT payload in the context user object if needed in the handler
      return true;
    } catch (err) {
      return false;
    }
  }
}
