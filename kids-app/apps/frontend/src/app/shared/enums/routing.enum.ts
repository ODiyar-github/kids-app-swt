/**
 * @enum RoutingEnum
 * @description Definiert die verschiedenen Routenpfade, die in der Angular-Anwendung verwendet werden.
 * Dies sorgt für eine konsistente und fehlerfreie Navigation, indem es eine zentrale Quelle
 * für alle Anwendungsrouten bereitstellt.
 */
export enum RoutingEnum {
  /**
   * @member {string} LOGIN - Der Pfad für die Anmeldeseite.
   */
  LOGIN = 'login',

  /**
   * @member {string} REGISTER - Der Pfad für die Registrierungsseite.
   */
  REGISTER = 'register',

  /**
   * @member {string} DASHBOARD - Der Pfad für die Hauptübersichtsseite (Dashboard).
   */
  DASHBOARD = 'dashboard',

  /**
   * @member {string} EVENT - Der Basis-Pfad für Event-bezogene Seiten (z.B. Event-Details).
   */
  EVENT = 'event',

  /**
   * @member {string} PROFILE - Der Pfad für die Benutzerprofilseite.
   */
  PROFILE = 'profile',

  /**
   * @member {string} COMMUNITY - Der Pfad für die Community-Seite.
   */
  COMMUNITY = 'community',

  /**
   * @member {string} ABOUT - Der Pfad für die "Über uns"-Seite.
   */
  ABOUT = 'about',

  /**
   * @member {string} CONTACT - Der Pfad für die Kontakt- und Feedback-Seite.
   */
  CONTACT = "feedback",
}
