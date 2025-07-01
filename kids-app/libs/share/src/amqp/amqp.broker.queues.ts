export class AmqpBrokerQueues {
  static PREFIX = process.env["AMQP_QUEUE_PREFIX"] || 'kidsapp-dev-';

  static KIDS_APP_STORAGE_SERVICE_QUEUE = `${AmqpBrokerQueues.PREFIX}KIDS_APP_BACKEND_QUEUE`;
  static KIDS_APP_DAS_QUEUE = `${AmqpBrokerQueues.PREFIX}KIDS_APP_DAS_QUEUE`;
}