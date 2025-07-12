package com.example.demo.share.dataObjects.dtos;

import com.example.demo.share.dataObjects.enums.RatingEnum;

/**
 * @file EventFeedBackDto.java
 * @description Diese Klasse repräsentiert ein Datenübertragungsobjekt (DTO) für Event-Feedback.
 * Sie wird verwendet, um Feedback-Informationen zu einem Event zu kapseln,
 * einschließlich der Benutzer-ID, des Benutzernamens, einer Bewertung und einer Nachricht.
 */

/**
 * @class EventFeedBackDto
 * @description POJO (Plain Old Java Object) zur Speicherung von Event-Feedback-Daten.
 * Es enthält Felder für den Benutzer, der das Feedback gegeben hat, die Bewertung
 * und eine zugehörige Nachricht.
 */
public class EventFeedBackDto {
    /**
     * @private
     * @property {String} userId - Die ID des Benutzers, der das Feedback gegeben hat.
     */
    private String userId;
    /**
     * @private
     * @property {String} userName - Der Name des Benutzers, der das Feedback gegeben hat.
     */
    private String userName;
    /**
     * @private
     * @property {RatingEnum} rating - Die Bewertung des Events, definiert durch die `RatingEnum`.
     */
    private RatingEnum rating;
    /**
     * @private
     * @property {String} message - Die Feedback-Nachricht oder der Kommentar.
     */
    private String message;

    /**
     * @constructor
     * @description Standardkonstruktor für die `EventFeedBackDto`-Klasse.
     * Ermöglicht die Instanziierung ohne anfängliche Werte.
     */
    public EventFeedBackDto() {}

    // Getter und Setter

    /**
     * @method getUserId
     * @description Gibt die Benutzer-ID des Feedback-Gebers zurück.
     * @returns {String} Die Benutzer-ID.
     */
    public String getUserId() { return userId; }
    /**
     * @method setUserId
     * @description Setzt die Benutzer-ID des Feedback-Gebers.
     * @param {String} userId - Die neue Benutzer-ID.
     */
    public void setUserId(String userId) { this.userId = userId; }

    /**
     * @method getUserName
     * @description Gibt den Benutzernamen des Feedback-Gebers zurück.
     * @returns {String} Der Benutzername.
     */
    public String getUserName() { return userName; }
    /**
     * @method setUserName
     * @description Setzt den Benutzernamen des Feedback-Gebers.
     * @param {String} userName - Der neue Benutzername.
     */
    public void setUserName(String userName) { this.userName = userName; }

    /**
     * @method getRating
     * @description Gibt die Bewertung des Events zurück.
     * @returns {RatingEnum} Die Bewertung.
     */
    public RatingEnum getRating() { return rating; }
    /**
     * @method setRating
     * @description Setzt die Bewertung des Events.
     * @param {RatingEnum} rating - Die neue Bewertung.
     */
    public void setRating(RatingEnum rating) { this.rating = rating; }

    /**
     * @method getMessage
     * @description Gibt die Feedback-Nachricht zurück.
     * @returns {String} Die Nachricht.
     */
    public String getMessage() { return message; }
    /**
     * @method setMessage
     * @description Setzt die Feedback-Nachricht.
     * @param {String} message - Die neue Nachricht.
     */
    public void setMessage(String message) { this.message = message; }
}
