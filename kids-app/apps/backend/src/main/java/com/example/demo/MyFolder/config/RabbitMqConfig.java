package com.example.demo.MyFolder.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration // Markiert diese Klasse als Spring-Konfigurationsklasse
public class RabbitMqConfig {

    /**
     * Definiert einen Bean für den Jackson2JsonMessageConverter.
     * Dieser Konverter wandelt Java-Objekte in JSON (für ausgehende Nachrichten)
     * und JSON in Java-Objekte (für eingehende Nachrichten) um.
     * Spring Boot erkennt diesen Bean automatisch und verwendet ihn für
     * RabbitMQ-Nachrichten.
     */
    @Bean
    public MessageConverter jsonMessageConverter() {
        // Hier wird ein neuer Jackson2JsonMessageConverter erstellt.
        // Spring Boot wird diesen automatisch verwenden, um deine GenericMessage DTOs
        // in JSON zu serialisieren/deserialisieren.
        return new Jackson2JsonMessageConverter();
    }
}
