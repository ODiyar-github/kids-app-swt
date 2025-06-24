import { AppFeedback } from "../util/app.feedback";
import { AppFeedbackEnum } from "../util/enums/app.feedback.enum";

export const AppFeedbackMockup: AppFeedback[] = [
  new AppFeedback(
    "Anna Schmidt",
    AppFeedbackEnum.GeneralFeedback,
    "Ich finde die App insgesamt sehr gelungen. Besonders die Veranstaltungsvorschläge passen gut zu meinen Interessen.",
    "anna.schmidt@example.com"
  ),
  new AppFeedback(
    "Max Mustermann",
    AppFeedbackEnum.FeatureRequest,
    "Eine Kalenderintegration oder Erinnerungsfunktion für Events wäre super hilfreich.",
    "max.mustermann@example.com"
  ),
  new AppFeedback(
    "Lena Müller",
    AppFeedbackEnum.BugReport,
    "Beim Registrieren wurde meine Adresse zweimal gespeichert. Könntet ihr das überprüfen?",
    "lena.mueller@example.com"
  ),
  new AppFeedback(
    "Tim Jansen",
    AppFeedbackEnum.UIUXIssue,
    "Auf kleineren Bildschirmen ist der Text auf den Eventkarten teilweise abgeschnitten.",
    "tim.jansen@example.com"
  ),
  new AppFeedback(
    "Sophie Keller",
    AppFeedbackEnum.PerformanceIssue,
    "Die Ladezeiten beim Wechsel zwischen Tabs sind teilweise recht lang (getestet auf iOS).",
    "sophie.keller@example.com"
  ),
  new AppFeedback(
    "Felix Bauer",
    AppFeedbackEnum.Other,
    "Gibt es eine Möglichkeit, Events mit Freunden gemeinsam zu planen? Das wäre cool!",
    "felix.bauer@example.com"
  ),
  new AppFeedback(
    "Nina Schwarz",
    AppFeedbackEnum.GeneralFeedback,
    "Ich mag das Design der App – schön modern und übersichtlich!",
    "nina.schwarz@example.com"
  ),
  new AppFeedback(
    "Jan Lange",
    AppFeedbackEnum.BugReport,
    "Ich konnte das Street Food Event nicht in meine Favoriten speichern. Es kam keine Fehlermeldung.",
    "jan.lange@example.com"
  ),
  new AppFeedback(
    "Julia Berg",
    AppFeedbackEnum.FeatureRequest,
    "Eine Filterfunktion für Events nach Datum oder Thema wäre sehr hilfreich.",
    "julia.berg@example.com"
  ),
  new AppFeedback(
    "Lukas Maier",
    AppFeedbackEnum.PerformanceIssue,
    "Die App stürzt bei mir manchmal beim Öffnen von Eventdetails ab (Android 12).",
    "lukas.maier@example.com"
  )
];