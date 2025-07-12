import { AppFeedbackEnum } from './enums/app.feedback.enum';

/**
 * @class AppFeedback
 * @description Repräsentiert ein Feedback-Objekt, das von einem Benutzer zur Anwendung abgegeben wird.
 * Enthält Details wie die Feedback-ID, Benutzer-ID, Bewertung, Kommentar und den Zeitstempel.
 */
export class AppFeedback {
  /**
   * @property {string} feedbackId - Die eindeutige Kennung für dieses Feedback.
   */
  feedbackId: string;

  /**
   * @property {string} userId - Die ID des Benutzers, der das Feedback abgegeben hat.
   */
  userId: string;

  /**
   * @property {AppFeedbackEnum} rating - Die Kategorie oder Art des Feedbacks, ausgedrückt durch den AppFeedbackEnum.
   */
  rating: AppFeedbackEnum;

  /**
   * @property {string} comment - Der eigentliche Kommentar oder die Nachricht des Feedbacks.
   */
  comment: string;

  /**
   * @property {string} timestamp - Der Zeitstempel, wann das Feedback abgegeben wurde (im ISO-8601 Format).
   */
  timestamp: string;

  /**
   * Erstellt eine Instanz von AppFeedback.
   * @param {string} feedbackId - Die eindeutige ID des Feedbacks.
   * @param {string} userId - Die ID des Benutzers.
   * @param {AppFeedbackEnum} rating - Die Bewertung oder Kategorie des Feedbacks.
   * @param {string} comment - Der Kommentar des Feedbacks.
   * @param {string} timestamp - Der Zeitstempel des Feedbacks.
   */
  constructor(
    feedbackId: string,
    userId: string,
    rating: AppFeedbackEnum,
    comment: string,
    timestamp: string,
  ) {
    this.feedbackId = feedbackId;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
    this.timestamp = timestamp;
  }
}
