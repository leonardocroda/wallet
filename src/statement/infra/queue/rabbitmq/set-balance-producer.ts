import {
  Message,
  SetBalanceProducer,
} from 'src/statement/domain/gateways/producers/set-balance-producer';
import { Injectable } from '@nestjs/common';
import { AMQPRabbitMQService } from '../../../../shared/frameworks/rabbitmq/rabbit-mq-framework';

@Injectable()
export class SetBalanceProducerImpl
  extends AMQPRabbitMQService
  implements SetBalanceProducer
{
  constructor() {
    super('amqp://guest:guest@0.0.0.0:5672');
  }

  async setBalance(message: Message): Promise<void> {
    await this.initialize();
    await this.publish('SET_BALANCE', message);
  }
}
