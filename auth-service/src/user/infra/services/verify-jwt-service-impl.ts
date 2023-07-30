import { VerifyJwtService } from '../../domain/gateways/verify-jwt-service';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from 'src/config/constants';

export class VerifyJwtServiceImpl implements VerifyJwtService {
  verify(token: string): { accountId: number; email: string; id: number } {
    try {
      const tokenWithoutBearer = token.split('Bearer ');

      const decoded = verify(tokenWithoutBearer[1], jwtConstants.secret);

      return decoded as { accountId: number; email: string; id: number };
    } catch (error) {
      console.log(error);
    }
  }
}
