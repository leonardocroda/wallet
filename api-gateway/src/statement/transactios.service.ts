import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { statementClient } from '../clients/statement-client';
import {
  Purchase,
  StatementService,
  Transaction,
  Transfer,
} from '../proto/build/statement';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionsService implements OnModuleInit {
  @Client(statementClient)
  private readonly client: ClientGrpc;

  private statementService: StatementService;

  onModuleInit() {
    this.statementService =
      this.client.getService<StatementService>('StatementService');
  }

  async getAll(accountId: number) {
    const observable = this.statementService.GetAll({
      accountId,
    }) as unknown as Observable<{ transactions: Transaction[] }>;

    return observable.toPromise();
  }

  async savePurchaseOnStatement(purchase: Purchase) {
    const observable = this.statementService.SavePurchaseOnStatement(
      purchase,
    ) as unknown as Observable<void>;

    return observable.toPromise();
  }

  async saveTransferOnStatement(transfer: Transfer) {
    const observable = this.statementService.SaveTransferOnStatement(
      transfer,
    ) as unknown as Observable<void>;

    return observable.toPromise();
  }
}
