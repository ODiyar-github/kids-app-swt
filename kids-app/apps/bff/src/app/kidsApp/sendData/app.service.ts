import { Inject, Injectable } from '@nestjs/common';
import { RmqPatterns, AmqpBrokerQueues } from "@libs/amqp/amqp";
import { JsonData, UserMockups, EventMockups, AppFeedbackMockup} from '@kids-app/share';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';

/**
 * @file app.service.ts
 * @description Dieser Dienst ist für das Senden von Initialisierungs- oder Mockup-Daten an den Storage Service zuständig.
 * Er stellt sicher, dass die Daten nur einmal gesendet werden, um Duplikate zu vermeiden.
 */

/**
 * @class AppService
 * @description NestJS Service, der die Kommunikation mit dem Storage Service für das Senden von Mockup-Daten handhabt.
 * Er verwendet `ClientProxy`, um Nachrichten an die RabbitMQ-Warteschlange zu senden.
 */
@Injectable()
export class AppService {
  /**
   * @private
   * @property {boolean} isSend - Ein Flag, das verfolgt, ob die Mockup-Daten bereits gesendet wurden,
   * um ein mehrfaches Senden zu verhindern.
   */
  private isSend = false;

  /**
   * Erstellt eine Instanz von AppService.
   * @param {ClientProxy} client - Der injizierte ClientProxy für die Kommunikation mit dem Kids App Storage Service.
   * Die Injektion erfolgt über das `@Inject`-Decorator mit dem Warteschlangennamen.
   */
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly client: ClientProxy,
  ) {}

  /**
   * @method sendMockupData
   * @description Sendet Mockup-Daten (Benutzer-, Event- und Feedback-Daten) an den Storage Service.
   * Diese Methode stellt sicher, dass die Daten nur einmal gesendet werden.
   * @returns {Observable<any>} Ein Observable, das entweder eine Bestätigung des Versands
   * oder eine Nachricht, dass die Daten bereits gesendet wurden, emittiert.
   */
  sendMockupData(): Observable<any> {
    // Prüft, ob die Daten bereits gesendet wurden.
    if (this.isSend === false) {
      // Erstellt ein JsonData-Objekt mit den Mockup-Daten.
      const jsonData: JsonData = {
        _id: '', // Die ID wird typischerweise vom Backend zugewiesen, hier leer gelassen.
        _rev: '', // Die Revision wird typischerweise vom Backend zugewiesen, hier leer gelassen.
        userData: UserMockups, // Füllt mit den Benutzer-Mockups.
        eventData: EventMockups, // Füllt mit den Event-Mockups.
        feedBackAppData: AppFeedbackMockup, // Füllt mit den App-Feedback-Mockups.
      };
      try {
        this.isSend = true; // Setzt das Flag auf true, um zukünftiges Senden zu verhindern.
        // Sendet die JsonData mit dem SEND_MOCKUP-Muster an den ClientProxy.
        return this.client.send(RmqPatterns.SENDDATA.SEND_MOCKUP, jsonData);
      } catch (error) {
        // Fängt Fehler beim Senden ab und loggt sie.
        console.error('Fehler beim Senden der Mockup-Daten:', error.message);
        // Gibt ein Observable mit einer Fehlermeldung zurück.
        return of(('Error by sending Data to Backend!'));
      }
    }
    else {
      // Wenn die Daten bereits gesendet wurden, gibt eine entsprechende Nachricht zurück.
      return of('Data already set');
    }
  }
}
