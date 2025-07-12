/**
 * @class Logs
 * @description Repräsentiert einen einzelnen Log-Eintrag, der eine Aktion oder ein Ereignis festhält.
 * Enthält Informationen über den Namen des Akteurs, das Datum, die ID des betroffenen Events und eine Nachricht.
 */
export class Logs {
    /**
     * @property {string} name - Der Name des Benutzers oder der Entität, die den Log-Eintrag ausgelöst hat.
     */
    name: string;

    /**
     * @property {string} date - Das Datum und die Uhrzeit des Log-Eintrags im ISO-8601 Format.
     */
    date: string;

    /**
     * @property {string} joinedEventId - Die ID des Events, das mit diesem Log-Eintrag in Verbindung steht (z.B. ein beigetretenes Event).
     */
    joinedEventId: string;

    /**
     * @property {string} message - Eine beschreibende Nachricht über das geloggte Ereignis.
     */
    message: string;

    /**
     * Erstellt eine Instanz von Logs.
     * @param {string} name - Der Name des Benutzers oder der Entität.
     * @param {string} date - Das Datum des Log-Eintrags.
     * @param {string} joinedEventId - Die ID des zugehörigen Events.
     * @param {string} message - Die Log-Nachricht.
     */
    constructor(
        name: string,
        date: string,
        joinedEventId: string,
        message: string,
    ) {
        this.name = name;
        this.date = date;
        this.joinedEventId = joinedEventId;
        this.message = message;
    }
}
