package com.example.demo.share.util;

import java.util.Map;

/**
 * @file GenericMessage.java
 * @description Diese Klasse repräsentiert eine generische Nachricht, die über ein Messaging-System
 * (z.B. RabbitMQ) gesendet oder empfangen wird. Sie enthält ein Muster (Pattern), das den Typ
 * der Nachricht identifiziert, und eine Map für die zugehörigen Daten.
 * Sie ist so konzipiert, dass sie leicht von JSON serialisiert und deserialisiert werden kann.
 */

/**
 * @class GenericMessage
 * @description Eine POJO (Plain Old Java Object) Klasse zur Kapselung von Nachrichtenmustern und zugehörigen Daten.
 * Nützlich für die flexible Kommunikation zwischen Diensten, insbesondere in Microservices-Architekturen.
 */
public class GenericMessage {
    /**
     * @private
     * @property {String} pattern - Das Muster oder der Typ der Nachricht. Dies identifiziert,
     * welche Art von Operation oder Event die Nachricht repräsentiert.
     */
    private String pattern;
    /**
     * @private
     * @property {Map<String, Object>} data - Eine Map, die die eigentlichen Nutzdaten der Nachricht enthält.
     * Die Schlüssel sind Strings und die Werte können beliebige Objekte sein, die JSON-kompatibel sind.
     */
    private Map<String, Object> data;

    /**
     * @constructor
     * @description Standardkonstruktor für die `GenericMessage`-Klasse.
     * Dieser Konstruktor ist **sehr wichtig** für JSON-Deserialisierungsbibliotheken
     * wie Jackson, die ihn benötigen, um JSON-Strings in Java-Objekte umzuwandeln.
     */
    public GenericMessage() {
        // Dieser Konstruktor ist notwendig für Bibliotheken wie Jackson,
        // die JSON in Objekte umwandeln.
    }

    /**
     * @method getPattern
     * @description Gibt das Muster (Pattern) der Nachricht zurück.
     * @returns {String} Das Muster der Nachricht.
     */
    public String getPattern() {
        return pattern;
    }

    /**
     * @method getData
     * @description Gibt die Daten-Map der Nachricht zurück.
     * @returns {Map<String, Object>} Die Map mit den Nutzdaten der Nachricht.
     */
    public Map<String, Object> getData() {
        return data;
    }

    /**
     * @method setPattern
     * @description Setzt das Muster (Pattern) der Nachricht.
     * @param {String} pattern - Das zu setzende Muster der Nachricht.
     */
    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    /**
     * @method setData
     * @description Setzt die Daten-Map der Nachricht.
     * @param {Map<String, Object>} data - Die zu setzende Map mit den Nutzdaten der Nachricht.
     */
    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    /**
     * @method toString
     * @description Gibt eine String-Repräsentation des `GenericMessage`-Objekts zurück.
     * Nützlich für Debugging-Zwecke.
     * @returns {String} Eine String-Repräsentation des Objekts.
     */
    @Override
    public String toString() {
        return "GenericMessage{" +
               "pattern='" + pattern + '\'' +
               ", data=" + data +
               '}';
    }
}
