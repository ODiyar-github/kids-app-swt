package com.example.demo.share.interfaces;

import java.util.Map;

import com.example.demo.share.util.RabbitMqPattern;

/**
 * @file MessageHandler.java
 * @description Dieses Interface definiert den Vertrag für Klassen, die spezifische RabbitMQ-Nachrichten
 * basierend auf einem vordefinierten Muster verarbeiten können.
 * Es ist ein zentraler Bestandteil der Nachrichtenverarbeitungslogik in einer Microservices-Architektur.
 */

/**
 * @interface MessageHandler
 * @description Definiert die Methoden, die von einem Handler implementiert werden müssen,
 * um eine eingehende Nachricht mit einem bestimmten RabbitMQ-Muster zu verarbeiten.
 */
public interface MessageHandler {
    /**
     * @method getPattern
     * @description Gibt das `RabbitMqPattern` zurück, für das dieser Handler zuständig ist.
     * Dies ermöglicht dem Messaging-System, die richtige Handler-Implementierung für eine eingehende Nachricht zu finden.
     * @returns {RabbitMqPattern} Das RabbitMQ-Muster, das dieser Handler verarbeitet.
     */
    RabbitMqPattern getPattern();

    /**
     * @method handle
     * @description Verarbeitet die eingehende Nachricht.
     * Die Implementierung dieser Methode enthält die Geschäftslogik zur Verarbeitung der Nachrichtendaten.
     *
     * Gibt ein Objekt zurück, wenn eine Antwort auf die Nachricht erwartet wird (Request-Response-Muster).
     * Gibt `null` zurück, wenn keine explizite Antwort auf die Nachricht gesendet werden soll (Fire-and-Forget-Muster).
     *
     * @param {Map<String, Object>} data - Die Payload der Nachricht als Map. Die Schlüssel sind Strings,
     * und die Werte können beliebige Objekte sein, die die Nachrichtendaten repräsentieren.
     * @returns {Object} Ein Objekt als Antwort auf die verarbeitete Nachricht oder `null`,
     * wenn keine Antwort gesendet werden soll.
     */
    Object handle(Map<String, Object> data);
}
