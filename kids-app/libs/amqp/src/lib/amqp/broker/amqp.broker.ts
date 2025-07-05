import { ClientsModule, Transport } from '@nestjs/microservices';
import { DynamicModule } from '@nestjs/common';
import { AmqpBrokerQueues } from '../amqp.broker.queues';

export class AmqpBroker {

  public getStorageServiceBroker(): DynamicModule {
    return this.getMessageBroker(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE);
  }

  public getDASBroker(): DynamicModule {
    return this.getMessageBroker(AmqpBrokerQueues.KIDS_APP_DAS_QUEUE);
  }

  private getMessageBroker(queue: string): DynamicModule {
    const amqpUri = process.env['RABBITMQ_URL'];
    console.log(amqpUri);

    if (!amqpUri) {
      throw new Error('AMQP_URI not defiAmqpBrokerned');
    }

    return ClientsModule.register([
      {
        name: queue,
        transport: Transport.RMQ,
        options: {
          urls: [amqpUri],
          queue: queue,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]);
  }
}