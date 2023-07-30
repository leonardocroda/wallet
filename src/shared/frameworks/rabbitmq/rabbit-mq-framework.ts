// rabbitmq/amqp-rabbitmq.service.ts

import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class AMQPRabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async initialize() {
    try {
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();
    } catch (err) {
      console.log(err);
    }
  }

  async publish(queue: string, message: any) {
    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consume(queue: string, callback: (message: any) => Promise<void>) {
    await this.channel.assertQueue(queue);
    this.channel.consume(queue, async (message) => {
      if (message !== null) {
        const content = message.content.toString();
        const data = JSON.parse(content);
        await callback(data);
        this.channel.ack(message);
      }
    });
  }
}
