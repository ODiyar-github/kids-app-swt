package com.example.demo.MyFolder.config;

import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Konfigurationsklasse für RabbitMQ Queues.
 * Hier werden die Queues explizit als Spring Beans deklariert,
 * wodurch sie beim Start der Anwendung auf dem RabbitMQ-Broker erstellt werden.
 */
@Configuration
public class RabbitMqQueueConfig {

    // Injiziere den konfigurierten Präfix aus den application.properties
    // Der Standardwert wird nur verwendet, wenn 'spring.rabbitmq.prefix' nicht
    // gesetzt ist.
    @Value("${spring.rabbitmq.prefix:kidsapp-dev-}")
    private String queuePrefix;

    /**
     * Definiert die Queue für das Backend als Spring Bean.
     * Spring wird diese Queue automatisch auf dem RabbitMQ-Broker deklarieren,
     * sobald die Anwendung startet.
     *
     * @return Eine RabbitMQ Queue Instanz.
     */
    @Bean
    public Queue kidsAppBackendQueue() {
        String queueName = queuePrefix + "KIDS_APP_BACKEND_QUEUE";
        System.out.println("📦 Deklariere RabbitMQ Queue: " + queueName);
        // Erstellt eine durable (beständige) Queue.
        // Durable Queues überleben einen RabbitMQ-Broker-Neustart.
        // exclusive = false: Andere Consumer können sich auch verbinden.
        // autoDelete = false: Die Queue wird nicht gelöscht, wenn der letzte Consumer
        // die Verbindung trennt.
        return new Queue(queueName, true, false, false);
    }
}
