import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { RmqPatterns, JsonData, UserMockups, EventMockups, AppFeedbackMockup, AmqpBrokerQueues } from '@kids-app/share';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    //  const value =this.sendMockupData(); // Aktivieren, wenn du es testen möchtest
    //  console.log('Habe einen datenpacket von backend erhalten', value);
  }

  sendMockupData(): Observable<any>{
    const jsonData: JsonData = {
      _id: '', // Beispiel-ID
      _rev: '', // Beispiel-Revision
      userData: UserMockups, // Fülle dies mit deinen UserMockups
      eventData: EventMockups, // Fülle dies mit deinen EventMockups
      feedBackAppData: AppFeedbackMockup, // Fülle dies mit deinen AppFeedbackMockup
    };
    try {
      // WICHTIG: Verwende 'emit' statt 'send', wenn keine Antwort vom Backend erwartet wird.
      // 'emit' gibt ein Observable zurück, das nur signalisiert, dass die Nachricht gesendet wurde.
      // lastValueFrom ist hier nicht mehr nötig, da kein Wert zurückkommt, den man abwarten müsste.

      console.log('Mockup-Daten erfolgreich gesendet (Fire-and-Forget).', RmqPatterns.TEST.SEND_MOCKUP);
      return this.client.send(RmqPatterns.TEST.SEND_MOCKUP, jsonData);
    } catch (error) {
      console.error('Fehler beim Senden der Mockup-Daten:', error.message);
    }
  }
}
