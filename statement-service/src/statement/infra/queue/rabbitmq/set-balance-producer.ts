import {
  Message,
  SetBalanceProducer,
} from 'src/statement/domain/gateways/producers/set-balance-producer';
import { ClientProxy } from '@nestjs/microservices';

export class SetBalanceProducerImpl implements SetBalanceProducer {
  constructor(private client: ClientProxy) {}

  async setBalance(message: Message): Promise<void> {
    await this.client.send('SET_BALANCE', message).subscribe();
  }
}
