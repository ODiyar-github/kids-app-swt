package com.example.demo.share.dataObjects.util;

/**
 * @file Logs.java
 * @description Diese Klasse repräsentiert ein Log-Eintrag-Objekt,
 * das Informationen über eine Aktion oder ein Ereignis speichert,
 * typischerweise im Kontext eines Benutzers oder eines Events.
 */

/**
 * @class Logs
 * @description POJO (Plain Old Java Object) zur Speicherung von Log-Einträgen.
 * Es enthält Felder für den Namen des Akteurs, das Datum, die ID eines verbundenen Events
 * und eine beschreibende Nachricht.
 */
public class Logs {
    /**
     * @private
     * @property {String} name - Der Name des Benutzers oder der Entität, die den Log-Eintrag ausgelöst hat.
     */
    private String name;
    /**
     * @private
     * @property {String} date - Das Datum und die Uhrzeit des Log-Eintrags im String-Format.
     */
    private String date;
    /**
     * @private
     * @property {String} joinedEventId - Die ID des Events, mit dem dieser Log-Eintrag verbunden ist (z.B. ein Event, an dem teilgenommen wurde).
     */
    private String joinedEventId;
    /**
     * @private
     * @property {String} message - Eine beschreibende Nachricht des Log-Eintrags.
     */
    private String message;

    /**
     * @constructor
     * @description Standardkonstruktor für die `Logs`-Klasse.
     * Ermöglicht die Instanziierung ohne anfängliche Werte.
     */
    public Logs() {
    }

    /**
     * @constructor
     * @description Erstellt eine neue Instanz von `Logs` mit angegebenen Werten.
     * @param {String} name - Der Name des Akteurs.
     * @param {String} date - Das Datum des Log-Eintrags.
     * @param {String} joinedEventId - Die ID des verbundenen Events.
     * @param {String} message - Die Log-Nachricht.
     */
    public Logs(String name, String date, String joinedEventId, String message) {
        this.name = name;
        this.date = date;
        this.joinedEventId = joinedEventId;
        this.message = message;
    }

    // Getter und Setter

    /**
     * @method getName
     * @description Gibt den Namen des Akteurs zurück.
     * @returns {String} Der Name.
     */
    public String getName() {
        return name;
    }

    /**
     * @method setName
     * @description Setzt den Namen des Akteurs.
     * @param {String} name - Der neue Name.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @method getDate
     * @description Gibt das Datum des Log-Eintrags zurück.
     * @returns {String} Das Datum.
     */
    public String getDate() {
        return date;
    }

    /**
     * @method setDate
     * @description Setzt das Datum des Log-Eintrags.
     * @param {String} date - Das neue Datum.
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * @method getJoinedEventId
     * @description Gibt die ID des verbundenen Events zurück.
     * @returns {String} Die Event-ID.
     */
    public String getJoinedEventId() {
        return joinedEventId;
    }

    /**
     * @method setJoinedEventId
     * @description Setzt die ID des verbundenen Events.
     * @param {String} joinedEventId - Die neue Event-ID.
     */
    public void setJoinedEventId(String joinedEventId) {
        this.joinedEventId = joinedEventId;
    }

    /**
     * @method getMessage
     * @description Gibt die Log-Nachricht zurück.
     * @returns {String} Die Nachricht.
     */
    public String getMessage() {
        return message;
    }

    /**
     * @method setMessage
     * @description Setzt die Log-Nachricht.
     * @param {String} message - Die neue Nachricht.
     */
    public void setMessage(String message) {
        this.message = message;
    }
}
