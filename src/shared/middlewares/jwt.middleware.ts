// statement/middlewares/jwt.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from '../../config/constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
      const tokenWithoutBearer = token.split('Bearer ');
      const decoded = verify(tokenWithoutBearer[1], jwtConstants.secret);
      req['authorization'] = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
  }
}
