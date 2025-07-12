import { Inject, Injectable } from '@nestjs/common';
import { AmqpBrokerQueues, RmqPatterns } from "@libs/amqp/amqp";
import { EventDTO } from '@kids-app/share';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

/**
 * @file event.service.ts
 * @description Dieser Dienst ist für die Geschäftslogik im Zusammenhang mit Event-Operationen zuständig.
 * Er kommuniziert mit dem Kids App Storage Service (über AMQP), um Event-Daten abzurufen.
 */

/**
 * @class EventService
 * @description NestJS Service, der die Kommunikation mit dem Storage Service für Event-Daten handhabt.
 * Er verwendet `ClientProxy`, um Nachrichten an die RabbitMQ-Warteschlange zu senden.
 */
@Injectable()
export class EventService {
  /**
   * Erstellt eine Instanz von EventService.
   * @param {ClientProxy} client - Der injizierte ClientProxy für die Kommunikation mit dem Kids App Storage Service.
   * Die Injektion erfolgt über das `@Inject`-Decorator mit dem Warteschlangennamen.
   */
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly client: ClientProxy
  ) {}

  /**
   * @method getAllEvents
   * @description Sendet eine Anfrage an den Storage Service, um alle Events abzurufen.
   * @returns {Observable<EventDTO[]>} Ein Observable, das ein Array von EventDTO-Objekten emittiert.
   */
  getAllEvents(): Observable<EventDTO[]> {
    console.log('📨 Fordere alle Events vom Backend an'); // Loggt die Anfrage.
    // Sendet eine leere Nachricht mit dem GET_ALL-Muster an den ClientProxy.
    return this.client.send(RmqPatterns.EVENTS.GET_ALL, {});
  }

  /**
   * @method getEventById
   * @description Sendet eine Anfrage an den Storage Service, um ein Event anhand seiner ID abzurufen.
   * @param {string} id - Die ID des abzurufenden Events.
   * @returns {Observable<EventDTO>} Ein Observable, das das EventDTO des gefundenen Events emittiert.
   */
  getEventById(id: string): Observable<EventDTO> {
    console.log(`📨 Fordere Event mit ID ${id} an`); // Loggt die Anfrage.
    // Sendet eine Nachricht mit dem GET_BY_ID-Muster und der Event-ID an den ClientProxy.
    return this.client.send(RmqPatterns.EVENTS.GET_BY_ID, { id });
  }
}
