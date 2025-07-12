/**
 * @file environment.prod.ts
 * @description Diese Datei definiert die Produktionsumgebungskonfiguration für die Angular-Anwendung.
 * Sie enthält Einstellungen, die für den Einsatz in einer Produktionsumgebung optimiert sind,
 * insbesondere URLs für API-Endpunkte.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * Deklariert die globale `window`-Variable als `any`, um den Zugriff auf
 * dynamisch injizierte Umgebungsvariablen (`window.env`) zu ermöglichen,
 * ohne TypeScript-Fehler zu verursachen.
 */
declare const window: any;

/**
 * @constant BASE_URL
 * @description Definiert die Basis-URL für die API-Aufrufe.
 * Versucht, die URL aus `window.env.BASE_URL` zu lesen (was nützlich für dynamische
 * Umgebungsvariablen-Injektionen in Docker-Containern ist).
 * Fällt auf `http://localhost:3000/api` zurück, wenn `window.env.BASE_URL` nicht definiert ist.
 */
const BASE_URL = window.env?.BASE_URL || 'http://localhost:3000/api';

/**
 * @constant environment
 * @description Das Hauptkonfigurationsobjekt für die Anwendung im Produktionsmodus.
 * Enthält verschiedene URLs für die Kommunikation mit den Backend-Diensten.
 */
export const environment = {
    /**
     * @property {boolean} production - Ein Flag, das angibt, ob die Anwendung im Produktionsmodus läuft.
     * Im Produktionsmodus ist dieser Wert `true`.
     */
    production: true,

    /**
     * @property {object} MAIN - Konfiguration für den Haupt-API-Endpunkt.
     * @property {string} MAIN.URL - Die vollständige Basis-URL für die Haupt-API.
     */
    MAIN: {
      URL: `${BASE_URL}`,
    },

    /**
     * @property {object} EVENT - Konfiguration für den Event-API-Endpunkt.
     * @property {string} EVENT.URL - Die vollständige URL für den Event-API-Endpunkt.
     */
    EVENT: {
      URL: `${BASE_URL}/event`,
    },

    /**
     * @property {object} USER - Konfiguration für den Benutzer-API-Endpunkt.
     * @property {string} USER.URL - Die vollständige URL für den Benutzer-API-Endpunkt.
     */
    USER:{
      URL: `${BASE_URL}/user`,
    },

    /**
     * @property {object} FEEDBACK - Konfiguration für den Feedback-API-Endpunkt.
     * @property {string} FEEDBACK.URL - Die vollständige URL für den Feedback-API-Endpunkt.
     */
    FEEDBACK:{
      URL: `${BASE_URL}/feedback`
    }
};
