package com.example.demo.share.dataObjects.dtos;

import java.util.List;

import com.example.demo.share.dataObjects.util.AppFeedback;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @file JsonData.java
 * @description Diese Klasse repräsentiert ein umfassendes Datenübertragungsobjekt (DTO)
 * das verschiedene Listen von DTOs (Benutzer, Events, App-Feedback) sowie CouchDB-spezifische
 * Metadaten wie `_id` und `_rev` kapselt.
 * Sie wird typischerweise für den Import oder Export von Daten verwendet.
 */

/**
 * @class JsonData
 * @description POJO (Plain Old Java Object) zur Speicherung einer Sammlung von Daten,
 * die in einem JSON-Format vorliegen können. Es ist speziell für die Interaktion
 * mit Datenbanken wie CouchDB konzipiert, die `_id` und `_rev` Felder für Dokumente verwenden.
 */
public class JsonData {
    /**
     * @private
     * @property {String} _id - Die eindeutige ID des Dokuments in der Datenbank.
     * Die `@JsonProperty("_id")`-Annotation weist Jackson an, dieses Feld mit dem JSON-Feld `_id` zu mappen.
     */
    @JsonProperty("_id")
    private String _id;
    /**
     * @private
     * @property {String} _rev - Die Revisions-ID des Dokuments in der Datenbank.
     * Die `@JsonProperty("_rev")`-Annotation weist Jackson an, dieses Feld mit dem JSON-Feld `_rev` zu mappen.
     */
    @JsonProperty("_rev")
    private String _rev;
    /**
     * @private
     * @property {List<AuthLoginDTO>} userData - Eine Liste von `AuthLoginDTO`-Objekten, die Benutzeranmeldedaten enthalten.
     */
    private List<AuthLoginDTO> userData;
    /**
     * @private
     * @property {List<EventDTO>} eventData - Eine Liste von `EventDTO`-Objekten, die Event-Informationen enthalten.
     */
    private List<EventDTO> eventData;
    /**
     * @private
     * @property {List<AppFeedback>} feedBackAppData - Eine Liste von `AppFeedback`-Objekten, die Anwendungs-Feedback-Daten enthalten.
     */
    private List<AppFeedback> feedBackAppData;

    /**
     * @constructor
     * @description Standardkonstruktor für die `JsonData`-Klasse.
     * Ermöglicht die Instanziierung ohne anfängliche Werte.
     */
    public JsonData() {
    }

    // Getter und Setter

    /**
     * @method get_id
     * @description Gibt die CouchDB-Dokument-ID zurück.
     * @returns {String} Die Dokument-ID.
     */
    public String get_id() {
        return _id;
    }

    /**
     * @method set_id
     * @description Setzt die CouchDB-Dokument-ID.
     * @param {String} _id - Die neue Dokument-ID.
     */
    public void set_id(String _id) {
        this._id = _id;
    }

    /**
     * @method get_rev
     * @description Gibt die CouchDB-Dokument-Revision zurück.
     * @returns {String} Die Dokument-Revision.
     */
    public String get_rev() {
        return _rev;
    }

    /**
     * @method set_rev
     * @description Setzt die CouchDB-Dokument-Revision.
     * @param {String} _rev - Die neue Dokument-Revision.
     */
    public void set_rev(String _rev) {
        this._rev = _rev;
    }

    /**
     * @method getUserData
     * @description Gibt die Liste der Benutzerdaten (`AuthLoginDTO`) zurück.
     * @returns {List<AuthLoginDTO>} Die Liste der Benutzerdaten.
     */
    public List<AuthLoginDTO> getUserData() {
        return userData;
    }

    /**
     * @method setUserData
     * @description Setzt die Liste der Benutzerdaten (`AuthLoginDTO`).
     * @param {List<AuthLoginDTO>} userData - Die neue Liste der Benutzerdaten.
     */
    public void setUserData(List<AuthLoginDTO> userData) {
        this.userData = userData;
    }

    /**
     * @method getEventData
     * @description Gibt die Liste der Event-Daten (`EventDTO`) zurück.
     * @returns {List<EventDTO>} Die Liste der Event-Daten.
     */
    public List<EventDTO> getEventData() {
        return eventData;
    }

    /**
     * @method setEventData
     * @description Setzt die Liste der Event-Daten (`EventDTO`).
     * @param {List<EventDTO>} eventData - Die neue Liste der Event-Daten.
     */
    public void setEventData(List<EventDTO> eventData) {
        this.eventData = eventData;
    }

    /**
     * @method getFeedBackAppData
     * @description Gibt die Liste der Anwendungs-Feedback-Daten (`AppFeedback`) zurück.
     * @returns {List<AppFeedback>} Die Liste der Anwendungs-Feedback-Daten.
     */
    public List<AppFeedback> getFeedBackAppData() {
        return feedBackAppData;
    }

    /**
     * @method setFeedBackAppData
     * @description Setzt die Liste der Anwendungs-Feedback-Daten (`AppFeedback`).
     * @param {List<AppFeedback>} feedBackAppData - Die neue Liste der Anwendungs-Feedback-Daten.
     */
    public void setFeedBackAppData(List<AppFeedback> feedBackAppData) {
        this.feedBackAppData = feedBackAppData;
    }
}
