package com.example.demo.MyFolder.Controller;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.demo.MyFolder.share.interfaces.MessageHandler;
import com.example.demo.MyFolder.share.util.GenericMessage;
import com.example.demo.MyFolder.share.util.RabbitMqPattern;

import jakarta.annotation.PostConstruct; // Für die Initialisierung nach der Bean-Erstellung

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class RabbitMqController {
    private final Map<RabbitMqPattern, MessageHandler> handlerMap = new HashMap<>();
    
    @Value("${spring.rabbitmq.listener.simple.queues}") // Injiziert den aufgelösten Queue-Namen
    private String configuredQueueName;

    @PostConstruct // Diese Methode wird nach der Konstruktion der Bean aufgerufen
    public void logConfiguredQueue() {
        System.out.println("🔥 RabbitMqListener konfiguriert für Queue: " + configuredQueueName);
    }
    public RabbitMqController(List<MessageHandler> handlers) {
        for (MessageHandler handler : handlers) {
            handlerMap.put(handler.getPattern(), handler);
            System.out.println("✅ MessageHandler registriert für Pattern: " + handler.getPattern());
        }
    }

    @RabbitListener(queues = "${spring.rabbitmq.listener.simple.queues}")
    public Object handleMessage(GenericMessage message) {
        RabbitMqPattern receivedPattern = null;
        try {
            System.out.println("Message von der Queue: "+message);
            System.out.println("Message pattern von der Queue: "+message.getPattern());
            receivedPattern = RabbitMqPattern.fromString(message.getPattern());
            System.out.println("📧 Nachricht mit Pattern '" + receivedPattern.getPattern() + "' empfangen.");
        } catch (IllegalArgumentException e) {
            System.err
                    .println("❗ Fehler: Unbekanntes oder ungültiges Pattern erhalten: '" + message.getPattern() + "'");
            // Wenn das Pattern unbekannt ist, können wir nicht wissen, ob eine Antwort
            // erwartet wird.
            // Im Zweifel eine Fehlerantwort senden, wenn ein replyTo-Header vorhanden ist.
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "UnknownPattern");
            errorResponse.put("pattern", message.getPattern());
            // Hier würde Spring AMQP den Rückgabewert nur senden, wenn der replyTo-Header
            // vorhanden ist.
            return errorResponse;
        }

        MessageHandler handler = handlerMap.get(receivedPattern);

        if (handler != null) {
            System.out.println("➡️ Delegiere Verarbeitung an: " + handler.getClass().getSimpleName());

            // Rufe die handle-Methode des Handlers auf.
            // Der Handler ist jetzt dafür verantwortlich, null zurückzugeben,
            // wenn für sein Pattern keine Antwort gesendet werden soll.
            Object handlerResult = handler.handle(message.getData());

            // Hier kommt die entscheidende Logik:
            // Wir prüfen, ob das Pattern eine Antwort erwartet.
            if (receivedPattern.expectsReply()) {
                System.out.println("   Pattern '" + receivedPattern.getPattern()
                        + "' erwartet eine Antwort. Sende Ergebnis zurück.");
                return handlerResult; // Sende das Ergebnis des Handlers zurück
            } else {
                System.out.println("   Pattern '" + receivedPattern.getPattern()
                        + "' erwartet KEINE Antwort. Ergebnis wird ignoriert.");
                return null; // Explizit null zurückgeben, damit Spring AMQP nichts sendet
            }
        } else {
            System.err.println(
                    "⚠️ Kein MessageHandler für Pattern: " + receivedPattern + " gefunden. Sende Fehlerantwort.");
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "NoHandlerFound");
            errorResponse.put("pattern", receivedPattern.getPattern());
            // Auch hier: Spring AMQP sendet nur, wenn der replyTo-Header vorhanden ist.
            return errorResponse;
        }
    }
}
