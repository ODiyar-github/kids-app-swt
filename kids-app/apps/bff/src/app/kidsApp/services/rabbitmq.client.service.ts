import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { rabbitMqConfig } from '../configs/rabbitmq.config';


@Injectable()
export class RmqClientService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqConfig.url],
        queue: rabbitMqConfig.queue,
        queueOptions: { durable: false },
      },
    });
  }

  getClient(): ClientProxy {
    return this.client;
  }
}