import { AppFeedback } from "../../util/app.feedback";
import { EventDTO } from "../event/event.dto";
import { AuthLoginDTO } from "../user/auth.login.dto";

/**
 * @class JsonData
 * @description Repräsentiert ein Datenobjekt, das verschiedene Arten von Anwendungsdaten aggregiert,
 * typischerweise für die Speicherung in einer NoSQL-Datenbank wie CouchDB.
 * Enthält Benutzerdaten, Event-Daten und Anwendungs-Feedback-Daten.
 */
export class JsonData {
    /**
     * @property {string} _id - Die eindeutige ID des Dokuments in der Datenbank.
     * Dies ist oft eine interne ID, die von der Datenbank zugewiesen wird.
     */
    _id: string;

    /**
     * @property {string} _rev - Die Revisions-ID des Dokuments in der Datenbank.
     * Wird für die Versionskontrolle und Konfliktauflösung in verteilten Datenbanken verwendet.
     */
    _rev: string;

    /**
     * @property {AuthLoginDTO[]} userData - Eine Liste von Benutzerdaten-Objekten.
     * Enthält Informationen, die für die Authentifizierung und Benutzerverwaltung relevant sind.
     */
    userData: AuthLoginDTO[];

    /**
     * @property {EventDTO[]} eventData - Eine Liste von Event-Daten-Objekten.
     * Repräsentiert die verschiedenen Events, die in der Anwendung verwaltet werden.
     */
    eventData: EventDTO[];

    /**
     * @property {AppFeedback[]} feedBackAppData - Eine Liste von Anwendungs-Feedback-Objekten.
     * Enthält das Feedback, das Benutzer zur gesamten Anwendung abgegeben haben.
     */
    feedBackAppData: AppFeedback[];

    /**
     * Erstellt eine Instanz von JsonData.
     * @param {string} _id - Die eindeutige ID des Dokuments.
     * @param {string} _rev - Die Revisions-ID des Dokuments.
     * @param {AuthLoginDTO[]} userData - Eine Liste von Benutzerdaten.
     * @param {EventDTO[]} eventData - Eine Liste von Event-Daten.
     * @param {AppFeedback[]} feedBackAppData - Eine Liste von Anwendungs-Feedback-Daten.
     */
    constructor(
        _id: string,
        _rev: string,
        userData: AuthLoginDTO[],
        eventData: EventDTO[],
        feedBackAppData: AppFeedback[]
    ) {
        this._id = _id;
        this._rev = _rev;
        this.userData = userData;
        this.eventData = eventData;
        this.feedBackAppData = feedBackAppData;
    }
}
