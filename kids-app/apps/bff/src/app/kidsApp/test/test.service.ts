import { Injectable } from '@nestjs/common';
import { RmqClientService } from '../services/rabbitmq.client.service';
import { EventDTO, RmqPatterns } from '@kids-app/share';
import { Observable, of } from 'rxjs';

@Injectable()
export class TestService {
  private client = this.rmqClient.getClient();

  constructor(private readonly rmqClient: RmqClientService) {}

  getBackendTest(): Observable<string>{
    return of('Dies ist ein Test-String vom BFF-Backend!');
    // return this.client.send(RmqPatterns.GET_TEST, {});
  }
}