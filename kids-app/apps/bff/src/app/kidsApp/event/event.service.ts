import { Injectable } from '@nestjs/common';
import { RmqClientService } from '../services/rabbitmq.client.service';
import { EventDTO, RmqPatterns } from '@kids-app/share';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {
  private client = this.rmqClient.getClient();

  constructor(private readonly rmqClient: RmqClientService) {}

  getAllEvents(): Observable<EventDTO[]>{
    return this.client.send(RmqPatterns.GET_ALL_EVENTS, {});
  }

  getEventById(uuid: string):Observable<EventDTO> {
    return this.client.send(RmqPatterns.GET_EVENT_BY_ID, uuid);
  }
}