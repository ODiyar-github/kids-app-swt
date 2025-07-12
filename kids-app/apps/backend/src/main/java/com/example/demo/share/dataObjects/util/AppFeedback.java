package com.example.demo.share.dataObjects.util;

import com.example.demo.share.dataObjects.enums.AppFeedbackEnum;

/**
 * @file AppFeedback.java
 * @description Diese Klasse repräsentiert ein Datenobjekt für Anwendungs-Feedback.
 * Es speichert Informationen wie eine eindeutige Feedback-ID, die Benutzer-ID,
 * eine Bewertung (Rating), einen Kommentar und einen Zeitstempel.
 */

/**
 * @class AppFeedback
 * @description POJO (Plain Old Java Object) zur Speicherung von Anwendungs-Feedback-Daten.
 * Es enthält Felder für die Identifikation des Feedbacks, den zugehörigen Benutzer,
 * die Art des Feedbacks und den Zeitpunkt der Erstellung.
 */
public class AppFeedback {
    /**
     * @private
     * @property {String} feedbackId - Die eindeutige ID des Feedback-Eintrags.
     */
    private String feedbackId;
    /**
     * @private
     * @property {String} userId - Die ID des Benutzers, der das Feedback gegeben hat.
     */
    private String userId;
    /**
     * @private
     * @property {AppFeedbackEnum} rating - Die Art des Feedbacks, definiert durch die `AppFeedbackEnum`.
     */
    private AppFeedbackEnum rating;
    /**
     * @private
     * @property {String} comment - Der eigentliche Kommentar oder die Nachricht des Feedbacks.
     */
    private String comment;
    /**
     * @private
     * @property {String} timestamp - Der Zeitstempel, wann das Feedback erstellt wurde (im String-Format).
     */
    private String timestamp;

    /**
     * @constructor
     * @description Standardkonstruktor für die `AppFeedback`-Klasse.
     * Ermöglicht die Instanziierung ohne anfängliche Werte.
     */
    public AppFeedback() {
    }

    // Getter und Setter

    /**
     * @method getFeedbackId
     * @description Gibt die eindeutige ID des Feedback-Eintrags zurück.
     * @returns {String} Die Feedback-ID.
     */
    public String getFeedbackId() {
        return feedbackId;
    }

    /**
     * @method setFeedbackId
     * @description Setzt die eindeutige ID des Feedback-Eintrags.
     * @param {String} feedbackId - Die neue Feedback-ID.
     */
    public void setFeedbackId(String feedbackId) {
        this.feedbackId = feedbackId;
    }

    /**
     * @method getUserId
     * @description Gibt die ID des Benutzers zurück, der das Feedback gegeben hat.
     * @returns {String} Die Benutzer-ID.
     */
    public String getUserId() {
        return userId;
    }

    /**
     * @method setUserId
     * @description Setzt die ID des Benutzers, der das Feedback gegeben hat.
     * @param {String} userId - Die neue Benutzer-ID.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * @method getRating
     * @description Gibt die Art des Feedbacks (Rating) zurück.
     * @returns {AppFeedbackEnum} Die Bewertung des Feedbacks.
     */
    public AppFeedbackEnum getRating() {
        return rating;
    }

    /**
     * @method setRating
     * @description Setzt die Art des Feedbacks (Rating).
     * @param {AppFeedbackEnum} rating - Die neue Bewertung des Feedbacks.
     */
    public void setRating(AppFeedbackEnum rating) {
        this.rating = rating;
    }

    /**
     * @method getComment
     * @description Gibt den Kommentar des Feedbacks zurück.
     * @returns {String} Der Kommentar.
     */
    public String getComment() {
        return comment;
    }

    /**
     * @method setComment
     * @description Setzt den Kommentar des Feedbacks.
     * @param {String} comment - Der neue Kommentar.
     */
    public void setComment(String comment) {
        this.comment = comment;
    }

    /**
     * @method getTimestamp
     * @description Gibt den Zeitstempel des Feedbacks zurück.
     * @returns {String} Der Zeitstempel.
     */
    public String getTimestamp() {
        return timestamp;
    }

    /**
     * @method setTimestamp
     * @description Setzt den Zeitstempel des Feedbacks.
     * @param {String} timestamp - Der neue Zeitstempel.
     */
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
