import { Controller, Get, OnModuleInit, Req, Res } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { statementClient } from '../clients/statement-client';
import { StatementService, Transaction } from '../proto/build/statement';

import { TransactionsService } from './transactios.service';
import { AuthenticationService } from 'src/auth/authentication.service';

@Controller('transactions')
export class StatementController {
  constructor(
    private statementService: TransactionsService,
    private authService: AuthenticationService,
  ) {}

  @Get()
  async getAll(@Req() req: Request, @Res() resp: Response) {
    const user = await this.authService.validateToken(req);
    if (user) {
      const transactions = await this.statementService.getAll(user.accountId);
      return resp.status(200).json(transactions);
    }

    return resp.status(401).send();
  }
}
