import { RatingEnum } from "../../util/enums/rating.enum";

/**
 * @class EventFeedBackDto
 * @description Datenübertragungsobjekt (DTO) zur Repräsentation des Feedbacks für ein Event.
 * Enthält Informationen über den Benutzer, die Bewertung und eine Nachricht.
 */
export class EventFeedBackDto {
    /**
     * @property {string} userId - Die eindeutige Kennung des Benutzers, der das Feedback abgegeben hat.
     */
    userId: string;

    /**
     * @property {string} userName - Der Name des Benutzers, der das Feedback abgegeben hat.
     */
    userName: string;

    /**
     * @property {RatingEnum} rating - Die Bewertung des Events, ausgedrückt durch den RatingEnum.
     */
    rating: RatingEnum;

    /**
     * @property {string} message - Die detaillierte Nachricht oder der Kommentar des Benutzers zum Event.
     */
    message: string;

    /**
     * Erstellt eine Instanz von EventFeedBackDto.
     * @param {string} userId - Die eindeutige Kennung des Benutzers.
     * @param {string} userName - Der Name des Benutzers.
     * @param {RatingEnum} rating - Die Bewertung des Events.
     * @param {string} message - Die Nachricht oder der Kommentar des Benutzers.
     */
    constructor(
        userId: string,
        userName: string,
        rating: RatingEnum,
        message: string
    ) {
        this.userId = userId;
        this.userName = userName;
        this.rating = rating;
        this.message = message;
    }
}