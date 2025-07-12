import { ClientsModule, Transport } from '@nestjs/microservices';
import { DynamicModule } from '@nestjs/common';
import { AmqpBrokerQueues } from '../amqp.broker.queues';

/**
 * @class AmqpBroker
 * @description Diese Klasse ist verantwortlich für die Bereitstellung von AMQP (RabbitMQ) Message Brokern
 * für verschiedene Dienste innerhalb der Anwendung. Sie kapselt die Konfiguration und Registrierung
 * der ClientsModule von NestJS für RabbitMQ.
 */
export class AmqpBroker {

  /**
   * Gibt ein DynamicModule für den Speicher-Service-Broker zurück.
   * Dieser Broker ist für die Kommunikation mit dem Kids App Backend Storage Service zuständig.
   * @returns {DynamicModule} Ein NestJS DynamicModule, das den RabbitMQ-Client für den Speicher-Service konfiguriert.
   */
  public getStorageServiceBroker(): DynamicModule {
    return this.getMessageBroker(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE);
  }

  /**
   * Gibt ein DynamicModule für den Data Access Service (DAS) Broker zurück.
   * Dieser Broker ist für die Kommunikation mit dem Kids App Data Access Service zuständig.
   * @returns {DynamicModule} Ein NestJS DynamicModule, das den RabbitMQ-Client für den DAS konfiguriert.
   */
  public getDASBroker(): DynamicModule {
    return this.getMessageBroker(AmqpBrokerQueues.KIDS_APP_DAS_QUEUE);
  }

  /**
   * @private
   * @description Registriert und konfiguriert einen RabbitMQ-Client als DynamicModule.
   * Die Konfiguration umfasst die AMQP-Verbindungs-URL und den Namen der Warteschlange.
   * @param {string} queue - Der Name der RabbitMQ-Warteschlange, mit der der Client kommunizieren soll.
   * @returns {DynamicModule} Ein NestJS DynamicModule, das den konfigurierten RabbitMQ-Client enthält.
   * @throws {Error} Wirft einen Fehler, wenn die Umgebungsvariable 'RABBITMQ_URL' nicht definiert ist.
   */
  private getMessageBroker(queue: string): DynamicModule {
    // Ruft die RabbitMQ-Verbindungs-URL aus den Umgebungsvariablen ab.
    const amqpUri = process.env['RABBITMQ_URL'];
    // Gibt die abgerufene URI zur Debugging-Zwecken in der Konsole aus.
    console.log(amqpUri);

    // Prüft, ob die RabbitMQ-URL definiert ist. Wenn nicht, wird ein Fehler geworfen.
    if (!amqpUri) {
      throw new Error('AMQP_URI not defined');
    }

    // Registriert den RabbitMQ-Client mithilfe von ClientsModule.register.
    return ClientsModule.register([
      {
        // Der Name des Clients, der dem Namen der Warteschlange entspricht.
        name: queue,
        // Der Transportmechanismus ist RabbitMQ (RMQ).
        transport: Transport.RMQ,
        // Optionen für die RabbitMQ-Verbindung.
        options: {
          // Eine Liste von RabbitMQ-Broker-URLs.
          urls: [amqpUri],
          // Der Name der Warteschlange, mit der dieser Client verbunden ist.
          queue: queue,
          // Zusätzliche Optionen für die Warteschlange.
          queueOptions: {
            // Die Warteschlange ist persistent und überlebt Broker-Neustarts.
            durable: true,
          },
        },
      },
    ]);
  }
}
