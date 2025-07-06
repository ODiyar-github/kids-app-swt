import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { RmqPatterns, AmqpBrokerQueues } from "@libs/amqp/amqp";
import { JsonData, UserMockups, EventMockups, AppFeedbackMockup} from '@kids-app/share';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  private isSend = false;
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly client: ClientProxy,
  ) {}

  sendMockupData(): Observable<any>{
    if(this.isSend === false){
      const jsonData: JsonData = {
        _id: '', // Beispiel-ID
        _rev: '', // Beispiel-Revision
        userData: UserMockups, // Fülle dies mit deinen UserMockups
        eventData: EventMockups, // Fülle dies mit deinen EventMockups
        feedBackAppData: AppFeedbackMockup, // Fülle dies mit deinen AppFeedbackMockup
      };
      try {
        this.isSend = true;
        return this.client.send(RmqPatterns.SENDDATA.SEND_MOCKUP, jsonData);
      } catch (error) {
        console.error('Fehler beim Senden der Mockup-Daten:', error.message);
        return of(('Error by sending Data to Backend!'));
      }
    }
    else{
      return of('Data already set');
    }
  }
}
