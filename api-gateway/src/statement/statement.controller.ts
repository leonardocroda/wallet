import { Controller, Get, OnModuleInit, Req } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Request } from 'express';
import { statementClient } from '../clients/statement-client';
import { StatementService, Transaction } from '../proto/build/statement';
import { Observable } from 'rxjs';

@Controller('transactions')
export class StatementController implements OnModuleInit {
  @Client(statementClient)
  private readonly client: ClientGrpc;

  private statementService: StatementService;

  onModuleInit() {
    this.statementService =
      this.client.getService<StatementService>('StatementService');
  }

  @Get()
  async getAll(@Req() req: Request) {
    const accountId = 1;
    const observable = this.statementService.GetAll({
      accountId,
    }) as unknown as Observable<Transaction[]>;

    const transactions = await observable.toPromise();

    return transactions;
  }
}
