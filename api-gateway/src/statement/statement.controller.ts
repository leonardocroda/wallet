import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from 'src/auth/authentication.service';
import { TransactionsService } from './transactios.service';

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
