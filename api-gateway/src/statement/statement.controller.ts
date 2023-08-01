import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from 'src/auth/authentication.service';
import { TransactionsService } from './transactios.service';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { Purchase, Transaction, Transfer } from './dto/statement.dto';

@ApiTags('Statement')
@Controller('statement')
export class StatementController {
  constructor(
    private statementService: TransactionsService,
    private authService: AuthenticationService,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Transactions list',
    type: Transaction,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Get()
  async getAll(@Req() req: Request, @Res() resp: Response) {
    const user = await this.authService.validateToken(req);
    if (user) {
      const transactions = await this.statementService.getAll(user.accountId);
      return resp.status(200).json(transactions);
    }

    return resp.status(401).send();
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Created',
  })
  @ApiConflictResponse({ description: 'Purchase already exists' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Post('/purchase')
  async savePurchaseOnStatement(
    @Req() req: Request,
    @Res() resp: Response,
    @Body() purchase: Purchase,
  ) {
    const user = await this.authService.validateToken(req);

    if (user && user?.accountId === purchase.accountId) {
      const response = await this.statementService.savePurchaseOnStatement(
        purchase,
      );
      const status = response?.status;

      return resp.status(status).send();
    }

    return resp.status(401).send();
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Created',
  })
  @ApiConflictResponse({ description: 'Transfer already exists' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Post('/transfer')
  async saveTransferOnStatement(
    @Req() req: Request,
    @Res() resp: Response,
    @Body() transfer: Transfer,
  ) {
    const user = await this.authService.validateToken(req);

    if (user && user?.accountId === transfer.accountId) {
      const response = await this.statementService.saveTransferOnStatement(
        transfer,
      );
      const status = response?.status;
      return resp.status(status).send();
    }

    return resp.status(401).send();
  }
}
