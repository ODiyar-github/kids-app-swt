import { Inject, Injectable } from '@nestjs/common';
import { AmqpBrokerQueues, EventDTO, RmqPatterns } from '@kids-app/share';
import { Observable, of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TestService {
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly backendClient: ClientProxy,

    @Inject(AmqpBrokerQueues.KIDS_APP_DAS_QUEUE)
    private readonly dasClient: ClientProxy
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