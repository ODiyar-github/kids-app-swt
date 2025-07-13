package com.example.demo.share.util;

/**
 * @file RabbitMqPattern.java
 * @description Diese Enumeration definiert die verschiedenen Muster (Patterns) für die Kommunikation
 * über RabbitMQ in der Anwendung. Jedes Muster repräsentiert einen spezifischen Nachrichtentyp
 * oder eine Operation, die zwischen Diensten ausgetauscht wird.
 */

/**
 * @enum RabbitMqPattern
 * @description Definiert die RabbitMQ-Nachrichtenmuster, die in der Anwendung verwendet werden.
 * Jedes Muster hat einen String-Wert und ein Flag, das angibt, ob eine Antwort erwartet wird.
 */
public enum RabbitMqPattern {

    /**
     * @member EVENTS_GET_ALL - Muster zum Abrufen aller Events. Erwartet eine Antwort.
     */
    EVENTS_GET_ALL("get-all", true),
    /**
     * @member EVENTS_GET_BY_ID - Muster zum Abrufen eines Events anhand seiner ID. Erwartet eine Antwort.
     */
    EVENTS_GET_BY_ID("get-by-id", true),
    /**
     * @member EVENTS_GET_BY - Muster zum Abrufen von Events basierend auf bestimmten Kriterien. Erwartet eine Antwort.
     */
    EVENTS_GET_BY("get-by", true),
    /**
     * @member PUT_EVENT - Muster zur Aktualisierung eines Events. Die Event-Daten (inkl. ID) werden im Request-Body übermittelt. Erwartet eine Antwort.
     */
    PUT_EVENT("update-event-by-id", true),

    /**
     * @member SEND_MOCKUP - Muster zum Senden von Mockup-Daten zur Initialisierung. Erwartet eine Antwort.
     */
    SEND_MOCKUP("send-mockup", true),
    /**
     * @member APP_GET_ALL_FEEDBACK - Muster zum Abrufen aller Anwendungs-Feedback-Einträge. Erwartet eine Antwort.
     */
    APP_GET_ALL_FEEDBACK("get-all-feedback", true),
    /**
     * @member APP_CREATE_FEEDBACK - Muster zum Erstellen eines neuen Anwendungs-Feedback-Eintrags. Erwartet eine Antwort.
     */
    APP_CREATE_FEEDBACK("save-feedback", true),

    /**
     * @member AUTH_LOGIN - Muster für die Benutzeranmeldung. Erwartet eine Antwort.
     */
    AUTH_LOGIN("login", true),
    /**
     * @member AUTH_GET_USER_BY_ID - Muster zum Abrufen eines Benutzers anhand seiner ID. Erwartet eine Antwort.
     */
    AUTH_GET_USER_BY_ID("get-user-by-id", true),
    /**
     * @member UPDATE_USER - Muster zum Aktualisieren von Benutzerdaten. Erwartet eine Antwort.
     */
    UPDATE_USER("update-user", true),
    /**
     * @member GET_ALL_USER - Muster zum Abrufen aller Benutzer. Erwartet eine Antwort.
     */
    GET_ALL_USER("get-all-user", true);

    /**
     * @private
     * @property {String} pattern - Der String-Wert des RabbitMQ-Musters.
     */
    private final String pattern;
    /**
     * @private
     * @property {boolean} expectsReply - Gibt an, ob bei diesem Muster eine Antwort erwartet wird.
     */
    private final boolean expectsReply;

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von RabbitMqPattern.
     * @param {String} pattern - Der String-Wert des Musters.
     * @param {boolean} expectsReply - Gibt an, ob eine Antwort erwartet wird.
     */
    RabbitMqPattern(String pattern, boolean expectsReply) {
        this.pattern = pattern;
        this.expectsReply = expectsReply;
    }

    /**
     * @method getPattern
     * @description Gibt den String-Wert des RabbitMQ-Musters zurück.
     * @returns {String} Der Muster-String.
     */
    public String getPattern() {
        return pattern;
    }

    /**
     * @method expectsReply
     * @description Gibt zurück, ob bei diesem Muster eine Antwort erwartet wird.
     * @returns {boolean} `true`, wenn eine Antwort erwartet wird, `false` sonst.
     */
    public boolean expectsReply() {
        return expectsReply;
    }

    /**
     * @method fromString
     * @description Sucht ein `RabbitMqPattern` anhand seines String-Wertes (case-insensitive).
     * @param {String} text - Der String-Wert des zu suchenden Musters.
     * @returns {RabbitMqPattern} Das gefundene `RabbitMqPattern`.
     * @throws {IllegalArgumentException} Wenn kein entsprechendes Muster gefunden wird.
     */
    public static RabbitMqPattern fromString(String text) {
        for (RabbitMqPattern mp : RabbitMqPattern.values()) {
            if (mp.pattern.equalsIgnoreCase(text)) {
                System.out.println("Pattern gefunden: " + mp.pattern.toString());
                return mp;
            }
        }
        throw new IllegalArgumentException("Kein RabbitMqPattern mit dem String: " + text + " gefunden.");
    }
}
