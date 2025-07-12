/**
 * @class AmqpBrokerQueues
 * @description Definiert statische Konstanten für die Namen der AMQP-Broker-Warteschlangen,
 * die in der Anwendung verwendet werden. Dies stellt eine zentrale und typisierte
 * Verwaltung der Warteschlangennamen sicher.
 */
export class AmqpBrokerQueues {
  /**
   * @static
   * @property {string} PREFIX - Das Präfix, das allen Warteschlangennamen vorangestellt wird.
   * Dies wird aus der Umgebungsvariable `AMQP_QUEUE_PREFIX` gelesen oder verwendet einen Standardwert (`'kidsapp-dev-'`).
   */
  static PREFIX = process.env["AMQP_QUEUE_PREFIX"] || 'kidsapp-dev-';

  /**
   * @static
   * @property {string} KIDS_APP_STORAGE_SERVICE_QUEUE - Der vollständige Name der Warteschlange
   * für den Kids App Backend Storage Service.
   */
  static KIDS_APP_STORAGE_SERVICE_QUEUE = `${AmqpBrokerQueues.PREFIX}KIDS_APP_BACKEND_QUEUE`;

  /**
   * @static
   * @property {string} KIDS_APP_DAS_QUEUE - Der vollständige Name der Warteschlange
   * für den Kids App Data Access Service (DAS).
   */
  static KIDS_APP_DAS_QUEUE = `${AmqpBrokerQueues.PREFIX}KIDS_APP_DAS_QUEUE`;
}
