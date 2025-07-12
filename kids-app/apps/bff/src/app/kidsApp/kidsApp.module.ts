/**
 * @file kidsApp.module.ts
 * @description Dies ist das Haupt-Feature-Modul der Kids App Backend-Anwendung.
 * Es aggregiert alle Kernkomponenten wie Controller und Services für Events, Benutzer,
 * Anwendungs-Feedback und Datenversand. Es konfiguriert auch die AMQP-Broker für die
 * Kommunikation mit anderen Microservices.
 */

import { Module } from "@nestjs/common";
import { EventController } from "./event/event.controller";
import { UserController } from "./user/user.controller";
import { EventService } from "./event/event.service";
import { UserService } from "./user/user.service";
import { AmqpBroker } from "@libs/amqp/amqp"; // Importiert die AmqpBroker-Klasse aus der Bibliothek
import { AppController } from "./sendData/app.controller"; // Umbenannt von AppController zu SendDataController für Klarheit
import { AppService } from "./sendData/app.service"; // Umbenannt von AppService zu SendDataService für Klarheit
import { AppFeedbackController } from "./feedback/app.feedback.controller";
import { AppFeedbackService } from "./feedback/app.feedback.service";

/**
 * @class KidsAppModule
 * @description Das Kernmodul, das die Funktionalität der Kids App Microservices definiert.
 * Es importiert die notwendigen AMQP-Broker für die Inter-Service-Kommunikation
 * und registriert alle Controller und Services, die für die Geschäftslogik der App zuständig sind.
 */
@Module({
    /**
     * @property {Array<any>} imports - Eine Liste von Modulen, die in dieses Modul importiert werden.
     * Hier werden die AMQP-Broker für den Data Access Service (DAS) und den Storage Service konfiguriert.
     */
    imports: [
      // Importiert und initialisiert den AMQP-Broker für den Data Access Service (DAS).
      // Dies ermöglicht die Kommunikation mit dem DAS-Microservice.
      new AmqpBroker().getDASBroker(),
      // Importiert und initialisiert den AMQP-Broker für den Storage Service.
      // Dies ermöglicht die Kommunikation mit dem Storage-Microservice.
      new AmqpBroker().getStorageServiceBroker()
    ],
    /**
     * @property {Array<any>} controllers - Eine Liste von Controllern, die in diesem Modul registriert werden.
     * Controller sind für die Handhabung eingehender HTTP-Anfragen zuständig.
     */
    controllers: [
      AppController, // Controller für das Senden von Initialisierungsdaten
      EventController, // Controller für Event-bezogene Endpunkte
      UserController, // Controller für Benutzer-bezogene Endpunkte
      AppFeedbackController // Controller für Anwendungs-Feedback-Endpunkte
    ],
    /**
     * @property {Array<any>} providers - Eine Liste von Services, die in diesem Modul registriert werden.
     * Services enthalten die Geschäftslogik und werden von Controllern verwendet.
     */
    providers: [
      AppService, // Service für das Senden von Initialisierungsdaten
      EventService, // Service für Event-Logik
      UserService, // Service für Benutzer-Logik
      AppFeedbackService // Service für Anwendungs-Feedback-Logik
    ],
  })
  export class KidsAppModule {}
