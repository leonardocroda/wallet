import { OnModuleInit, Injectable } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { accountClient } from 'src/clients/account-client';
import { AccountService } from 'src/proto/build/account';

@Injectable()
export class AccountServiceImpl implements OnModuleInit {
  @Client(accountClient)
  private readonly client: ClientGrpc;

  private accountService: AccountService;

  onModuleInit() {
    this.accountService =
      this.client.getService<AccountService>('AccountService');
  }

  async getBalance({ accountId }: { accountId: number }) {
    const observable = this.accountService.GetBalance({
      accountId,
    }) as unknown as Observable<{ balance: number }>;

    const balance = await observable.toPromise();
    return balance;
  }
}
