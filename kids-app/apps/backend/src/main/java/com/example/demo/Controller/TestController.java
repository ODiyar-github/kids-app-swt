package com.example.demo.Controller;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/backend") // Optional: Basis-Pfad für REST-Endpunkte
public class TestController {

    private final AtomicInteger messageCount = new AtomicInteger(0);

    // REST-Endpunkt, um den aktuellen Status oder eine einfache Bestätigung zu
    // erhalten
    @GetMapping("/test")
    public String getTestStatus() {
        return "Spring Boot Backend ist erreichbar und hat " + messageCount.get() + " RabbitMQ-Nachrichten empfangen.";
    }

    /**
     * Dieser Methode lauscht auf Nachrichten von RabbitMQ.
     * Der Wert in 'queues' muss dem Namen der RabbitMQ-Queue entsprechen,
     * an die dein NestJS BFF die Nachrichten sendet (RmqPatterns.GET_TEST).
     *
     * Wichtig: Der Wert von RmqPatterns.GET_TEST aus deinem NestJS BFF muss
     * hier im @RabbitListener genau übereinstimmen. Angenommen,
     * RmqPatterns.GET_TEST
     * ist ein String wie "get_test_data".
     */
    @RabbitListener(queues = "get-test-backend") // <--- WICHTIG: Ersetze "get_test_data" durch den tatsächlichen Wert von
    public String receiveTestMessage(String message) {
        System.out.println("Backend received message from RabbitMQ: " + message);
        messageCount.incrementAndGet(); // Zählt die empfangenen Nachrichten

        // Da NestJS (mit client.send) eine Antwort erwartet, müssen wir hier einen
        // String zurückgeben.
        // Dieser String wird als Antwort an den Absender (dein BFF) zurückgesendet.
        return "Backend received: " + message + " at " + System.currentTimeMillis();
    }
}