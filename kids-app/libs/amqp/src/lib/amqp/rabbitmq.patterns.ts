/**
 * @constant RmqPatterns
 * @description Definiert ein Objekt, das die verschiedenen RabbitMQ-Muster (Patterns) für die Kommunikation zwischen Diensten gruppiert.
 * Diese Muster werden als Nachrichten-Routing-Schlüssel oder Event-Namen in einem Microservices-Architektur verwendet.
 */
export const RmqPatterns = {
  /**
   * @property {object} AUTH - Muster für Authentifizierungs- und Benutzerverwaltungsdienste.
   */
  AUTH: {
    /**
     * @member {string} AUTH.LOGIN - Muster für die Benutzeranmeldung.
     */
    LOGIN: 'login',
    /**
     * @member {string} AUTH.GET_USER_BY_ID - Muster zum Abrufen eines Benutzers anhand seiner ID.
     */
    GET_USER_BY_ID: 'get-user-by-id',
    /**
     * @member {string} AUTH.UPDATE_USER - Muster zum Aktualisieren von Benutzerdaten.
     */
    UPDATE_USER: 'update-user',
    /**
     * @member {string} AUTH.GET_ALL_USER - Muster zum Abrufen aller Benutzer.
     */
    GET_ALL_USER: 'get-all-user'
  },
  /**
   * @property {object} EVENTS - Muster für Event-bezogene Dienste.
   */
  EVENTS: {
    /**
     * @member {string} EVENTS.GET_ALL - Muster zum Abrufen aller Events.
     */
    GET_ALL: 'get-all',
    /**
     * @member {string} EVENTS.GET_BY_ID - Muster zum Abrufen eines Events anhand seiner ID.
     */
    GET_BY_ID: 'get-by-id',
    /**
     * @member {string} EVENTS.GET_BY - Muster zum Abrufen von Events basierend auf bestimmten Kriterien.
     */
    GET_BY: 'get-by',
    /**
     * @member {string} EVENTS.PUT_EVENT - Muster zum Abrufen von Events basierend auf bestimmten Kriterien.
     */
    PUT_EVENT: 'update-event-by-id'
  },
  /**
   * @property {object} SENDDATA - Muster für Datensende-Operationen.
   */
  SENDDATA: {
    /**
     * @member {string} SENDDATA.SEND_MOCKUP - Muster zum Senden von Mockup-Daten.
     */
    SEND_MOCKUP: 'send-mockup',
  },
  /**
   * @property {object} FEEDBACK - Muster für Feedback-bezogene Dienste.
   */
  FEEDBACK:{
    /**
     * @member {string} FEEDBACK.GET_ALL_FEEDBACKS - Muster zum Abrufen aller Feedback-Einträge.
     */
    GET_ALL_FEEDBACKS: 'get-all-feedback',
    /**
     * @member {string} FEEDBACK.POST_FEEDBACK - Muster zum Speichern eines neuen Feedback-Eintrags.
     */
    POST_FEEDBACK: 'save-feedback'
  }
};
