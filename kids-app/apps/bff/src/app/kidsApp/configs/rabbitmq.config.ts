export const rabbitMqConfig = {
    url: process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672',
    queue: process.env.RABBITMQ_QUEUE || 'bff_queue',
};