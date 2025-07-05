import { Inject, Injectable } from '@nestjs/common';
import { AmqpBrokerQueues, RmqPatterns } from "@libs/amqp/amqp";
import { Observable, of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TestService {
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly backendClient: ClientProxy,
  ) {}


  getBackendTest(): Observable<any> {
    const payload = {
      message: 'Testdaten vom BFF',
      timestamp: new Date().toISOString(),
    };

    console.log('📨 Sende an RabbitMQ:', payload);

    return this.backendClient.send(RmqPatterns.TEST.BACKEND_TEST, payload);
  }
}