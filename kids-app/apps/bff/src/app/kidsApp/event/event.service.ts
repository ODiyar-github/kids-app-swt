import { Inject, Injectable } from '@nestjs/common';
import { AmqpBrokerQueues, EventDTO, RmqPatterns } from '@kids-app/share';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventService {
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly client: ClientProxy
  ) {}

  getAllEvents(): Observable<EventDTO[]> {
    console.log('📨 Fordere alle Events vom Backend an');
    return this.client.send(RmqPatterns.EVENTS.GET_ALL, {});
  }

  getEventById(id: string): Observable<EventDTO> {
    console.log(`📨 Fordere Event mit ID ${id} an`);
    return this.client.send(RmqPatterns.EVENTS.GET_BY_ID, { id });
  }
}