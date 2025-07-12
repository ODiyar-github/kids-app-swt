/**
 * @enum AppFeedbackEnum
 * @description Definiert die verschiedenen Kategorien von Feedback, die Benutzer zur Anwendung geben können.
 * Jede Enumeration repräsentiert eine spezifische Art von Feedback, wie Fehlerberichte, Feature-Anfragen oder allgemeines Feedback.
 */
export enum AppFeedbackEnum {
  /**
   * @member {string} BugReport - Kategorie für Berichte über Fehler oder unerwartetes Verhalten in der Anwendung.
   */
  BugReport = 'BUG_REPORT',

  /**
   * @member {string} FeatureRequest - Kategorie für Vorschläge neuer Funktionen oder Verbesserungen.
   */
  FeatureRequest = 'FEATURE_REQUEST',

  /**
   * @member {string} GeneralFeedback - Kategorie für allgemeines Lob, Kritik oder Kommentare zur Anwendung.
   */
  GeneralFeedback = 'GENERAL_FEEDBACK',

  /**
   * @member {string} UIUXIssue - Kategorie für Probleme oder Vorschläge bezüglich der Benutzeroberfläche (UI) oder Benutzererfahrung (UX).
   */
  UIUXIssue = 'UI_UX_ISSUE',

  /**
   * @member {string} PerformanceIssue - Kategorie für Feedback zu Leistungsproblemen wie langsamen Ladezeiten oder Abstürzen.
   */
  PerformanceIssue = 'PERFORMANCE_ISSUE',

  /**
   * @member {string} Other - Eine allgemeine Kategorie für Feedback, das in keine der spezifischeren Kategorien passt.
   */
  Other = 'OTHER'
}
