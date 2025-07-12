package com.example.demo.Controller;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.GenericMessage;
import com.example.demo.share.util.RabbitMqPattern;

import jakarta.annotation.PostConstruct; // Für die Initialisierung nach der Bean-Erstellung

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @file RabbitMqController.java
 * @description Dieser Controller ist für das Empfangen und Weiterleiten von RabbitMQ-Nachrichten zuständig.
 * Er fungiert als zentraler Nachrichten-Dispatcher, der eingehende Nachrichten basierend auf ihrem Muster
 * an den entsprechenden `MessageHandler` weiterleitet.
 */

/**
 * @class RabbitMqController
 * @description Spring Component, die als RabbitMQ-Listener fungiert.
 * Sie registriert alle `MessageHandler`-Implementierungen und leitet eingehende `GenericMessage`-Objekte
 * an den passenden Handler weiter.
 */
@Component
public class RabbitMqController {
    /**
     * @private
     * @property {Map<RabbitMqPattern, MessageHandler>} handlerMap - Eine Map, die `RabbitMqPattern`s
     * ihren entsprechenden `MessageHandler`-Implementierungen zuordnet.
     */
    private final Map<RabbitMqPattern, MessageHandler> handlerMap = new HashMap<>();

    /**
     * @private
     * @property {String} configuredQueueName - Der Name der RabbitMQ-Warteschlange,
     * die dieser Listener überwacht. Der Wert wird aus den Spring-Eigenschaften injiziert.
     */
    @Value("${spring.rabbitmq.listener.simple.queues}") // Injiziert den aufgelösten Queue-Namen
    private String configuredQueueName;

    /**
     * @method logConfiguredQueue
     * @description Eine Methode, die nach der Konstruktion der Bean aufgerufen wird (`@PostConstruct`).
     * Sie dient dazu, den konfigurierten Warteschlangennamen zu protokollieren.
     */
    @PostConstruct // Diese Methode wird nach der Konstruktion der Bean aufgerufen
    public void logConfiguredQueue() {
        System.out.println("🔥 RabbitMqListener konfiguriert für Queue: " + configuredQueueName);
    }

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `RabbitMqController`.
     * Spring injiziert eine Liste aller verfügbaren `MessageHandler`-Implementierungen,
     * die dann in der `handlerMap` registriert werden.
     * @param {List<MessageHandler>} handlers - Eine Liste aller `MessageHandler`-Implementierungen,
     * die von Spring gefunden wurden.
     */
    public RabbitMqController(List<MessageHandler> handlers) {
        for (MessageHandler handler : handlers) {
            handlerMap.put(handler.getPattern(), handler);
            System.out.println("✅ MessageHandler registriert für Pattern: " + handler.getPattern());
        }
    }

    /**
     * @method handleMessage
     * @description Diese Methode ist der Haupt-RabbitMQ-Listener.
     * Sie wird automatisch aufgerufen, wenn eine Nachricht in der konfigurierten Warteschlange empfangen wird.
     * Sie deserialisiert die `GenericMessage`, identifiziert das Muster und leitet die Nachricht
     * an den entsprechenden `MessageHandler` weiter. Die Rückgabe hängt davon ab, ob eine Antwort erwartet wird.
     * @param {GenericMessage} message - Die empfangene generische Nachricht.
     * @returns {Object} Das Ergebnis des `MessageHandler`s, wenn eine Antwort erwartet wird,
     * oder `null`, wenn keine Antwort gesendet werden soll. Bei Fehlern wird eine Fehler-Map zurückgegeben.
     */
    @RabbitListener(queues = "${spring.rabbitmq.listener.simple.queues}")
    public Object handleMessage(GenericMessage message) {
        RabbitMqPattern receivedPattern = null;
        try {
            System.out.println("Message von der Queue: "+message);
            System.out.println("Message pattern von der Queue: "+message.getPattern());
            // Versucht, das String-Muster der Nachricht in ein RabbitMqPattern-Enum zu konvertieren.
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

        // Sucht den passenden MessageHandler für das empfangene Muster.
        MessageHandler handler = handlerMap.get(receivedPattern);

        if (handler != null) {
            System.out.println("➡️ Delegiere Verarbeitung an: " + handler.getClass().getSimpleName());

            // Ruft die handle-Methode des Handlers auf.
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
