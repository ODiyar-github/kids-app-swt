package com.example.demo.MyFolder.share.interfaces;

import java.util.Map;

import com.example.demo.MyFolder.share.util.RabbitMqPattern;

public interface MessageHandler {
    // Gibt das Pattern zurück, für das dieser Handler zuständig ist
    RabbitMqPattern getPattern();

    /**
     * Verarbeitet die eingehende Nachricht.
     * Gibt ein Objekt zurück, wenn eine Antwort erwartet wird (Request-Response).
     * Gibt null zurück, wenn keine Antwort erwartet wird (Fire-and-Forget).
     *
     * @param data Die Payload der Nachricht.
     * @return Ein Objekt als Antwort oder null, wenn keine Antwort gesendet werden soll.
     */
    Object handle(Map<String, Object> data);
}
