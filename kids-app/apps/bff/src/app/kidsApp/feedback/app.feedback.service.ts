import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AmqpBrokerQueues, RmqPatterns } from "@libs/amqp/amqp";
import { AppFeedback } from "@kids-app/share";
import { Observable } from "rxjs";

/**
 * @file app.feedback.service.ts
 * @description Dieser Dienst ist für die Geschäftslogik im Zusammenhang mit Anwendungs-Feedback zuständig.
 * Er kommuniziert mit dem Kids App Storage Service (über AMQP), um Feedback-Einträge abzurufen und zu erstellen.
 */

/**
 * @class AppFeedbackService
 * @description NestJS Service, der die Kommunikation mit dem Storage Service für App-Feedback-Daten handhabt.
 * Er verwendet `ClientProxy`, um Nachrichten an die RabbitMQ-Warteschlange zu senden.
 */
@Injectable()
export class AppFeedbackService {
  /**
   * Erstellt eine Instanz von AppFeedbackService.
   * @param {ClientProxy} client - Der injizierte ClientProxy für die Kommunikation mit dem Kids App Storage Service.
   * Die Injektion erfolgt über das `@Inject`-Decorator mit dem Warteschlangennamen.
   */
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly client: ClientProxy
  ) {}

  /**
   * @method getAllFeedbacks
   * @description Sendet eine Anfrage an den Storage Service, um alle App-Feedback-Einträge abzurufen.
   * @returns {Observable<AppFeedback[]>} Ein Observable, das ein Array von AppFeedback-Objekten emittiert.
   */
  getAllFeedbacks(): Observable<AppFeedback[]> {
    console.log('📨 Fordere alle Appfeedbacks vom Backend an'); // Loggt die Anfrage.
    // Sendet eine leere Nachricht mit dem GET_ALL_FEEDBACKS-Muster an den ClientProxy.
    return this.client.send(RmqPatterns.FEEDBACK.GET_ALL_FEEDBACKS, {});
  }

  /**
   * @method createFeedback
   * @description Sendet eine Anfrage zum Erstellen eines neuen App-Feedback-Eintrags an den Storage Service.
   * @param {AppFeedback} newFeedback - Das AppFeedback-Objekt, das erstellt werden soll.
   * @returns {Observable<AppFeedback>} Ein Observable, das das erstellte AppFeedback-Objekt emittiert.
   */
  createFeedback(newFeedback: AppFeedback): Observable<AppFeedback> {
    // Sendet das neueFeedback-Objekt mit dem POST_FEEDBACK-Muster an den ClientProxy.
    return this.client.send(RmqPatterns.FEEDBACK.POST_FEEDBACK, newFeedback);
  }
}
