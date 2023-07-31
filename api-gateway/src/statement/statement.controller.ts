import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from 'src/auth/authentication.service';
import { TransactionsService } from './transactios.service';
import { Purchase, Transfer } from 'src/proto/build/statement';

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

  @Post('/purchase')
  async savePurchaseOnStatement(
    @Req() req: Request,
    @Res() resp: Response,
    @Body() purchase: Purchase,
  ) {
    const user = await this.authService.validateToken(req);

    if (user && user?.accountId === purchase.accountId) {
      await this.statementService.savePurchaseOnStatement(purchase);
      return resp.status(201).send();
    }

    return resp.status(401).send();
  }

  @Post('/transfer')
  async saveTransferOnStatement(
    @Req() req: Request,
    @Res() resp: Response,
    @Body() transfer: Transfer,
  ) {
    const user = await this.authService.validateToken(req);

    if (user && user?.accountId === transfer.accountId) {
      await this.statementService.saveTransferOnStatement(transfer);
      return resp.status(201).send();
    }

    return resp.status(401).send();
  }
}
