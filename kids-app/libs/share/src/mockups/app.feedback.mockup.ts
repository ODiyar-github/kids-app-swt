import { AppFeedback } from "../util/app.feedback";
// Wichtig: Hier das neue Enum importieren
import { AppFeedbackEnum } from "../util/enums/app.feedback.enum"; // Passe den Pfad an dein Enum an

export const AppFeedbackMockup: AppFeedback[] = [
  new AppFeedback(
    "f1a1e3b0-1d3a-4eaf-8e3a-5e2f4f01a2a0",
    "9e4b1a3d-3a6d-4d71-bfc4-2e3d8fdd8121", // Anna
    AppFeedbackEnum.GeneralFeedback, // Angabe der neuen Kategorie
    "Ich finde die App insgesamt sehr gelungen. Besonders die Veranstaltungsvorschläge passen gut zu meinen Interessen.",
    "2025-03-13T14:30:00Z" // Angepasstes ISO-8601 Format
  ),
  new AppFeedback(
    "c2b3f1c1-3e2b-4b1d-bb45-9a2b3b2a1c4f",
    "c26ae8b0-c9f0-4b66-bc3f-6ff2b83c2b4b", // Max
    AppFeedbackEnum.FeatureRequest, // Angabe der neuen Kategorie
    "Eine Kalenderintegration oder Erinnerungsfunktion für Events wäre super hilfreich.",
    "2025-05-13T08:00:00Z" // Angepasstes ISO-8601 Format
  ),
  new AppFeedback(
    "e3d2c4e4-5d6c-4c7f-a3d1-dc2e3b3d1f0a",
    "5c3bc4be-6c6a-4e56-92b8-14f63f92d69a", // Lena
    AppFeedbackEnum.BugReport, // Angabe der neuen Kategorie (Registrierungsfehler)
    "Beim Registrieren wurde meine Adresse zweimal gespeichert. Könntet ihr das überprüfen?",
    "2025-06-05T08:30:00Z" // Angepasstes ISO-8601 Format
  ),
  new AppFeedback(
    "b3f1d0a2-7f4a-41f2-84c1-2e3f0c4e1b5d",
    "7f90cbb5-b823-4564-9e5e-22a32fcd2187", // Tim
    AppFeedbackEnum.UIUXIssue, // Angabe der neuen Kategorie (Darstellungsproblem)
    "Auf kleineren Bildschirmen ist der Text auf den Eventkarten teilweise abgeschnitten.",
    "2025-06-06T14:45:00Z" // Angepasstes ISO-8601 Format
  ),
  new AppFeedback(
    "f4e3c2a1-3c4b-45f6-bb9f-1d2a3f0c2e1b",
    "d91e4ab8-4bd2-4e03-bc4a-8ddf46ce12b1", // Sophie
    AppFeedbackEnum.PerformanceIssue, // Angabe der neuen Kategorie (Ladezeiten)
    "Die Ladezeiten beim Wechsel zwischen Tabs sind teilweise recht lang (getestet auf iOS).",
    "2025-06-08T11:30:00Z" // Angepasstes ISO-8601 Format
  ),
  new AppFeedback(
    "d2c1a3f0-1e2b-4f6d-bc4e-0c3d4a5e6f1a",
    "4b78ad21-91d1-4c4f-9b2d-527f531bd9d8", // Felix
    AppFeedbackEnum.FeatureRequest, // Angabe der neuen Kategorie
    "Gibt es eine Möglichkeit, Events mit Freunden gemeinsam zu planen? Das wäre cool!",
    "2025-06-09T12:15:00Z" // Angepasstes ISO-8601 Format
  ),
  new AppFeedback(
    "a3f2b1d0-9d2a-45f4-bc3e-1f2a3b4c5d6e",
    "ebac3a3c-d3a7-4aaf-a4d2-c64db31de4d3", // Nina
    AppFeedbackEnum.GeneralFeedback, // Angabe der neuen Kategorie (Design-Lob)
    "Ich mag das Design der App – schön modern und übersichtlich!",
    "2025-06-10T10:00:00Z" // Angepasstes ISO-8601 Format
  ),
  new AppFeedback(
    "c3b4a2d1-4d2c-4f1b-bf3a-3f4e2d1c0b3e",
    "05f76e11-9f5c-41e5-a6b4-b5a684db645c", // Jan
    AppFeedbackEnum.BugReport, // Angabe der neuen Kategorie (Funktionsfehler)
    "Ich konnte das Street Food Event nicht in meine Favoriten speichern. Es kam keine Fehlermeldung.",
    "2025-06-11T18:30:00Z" // Angepasstes ISO-8601 Format
  ),
  new AppFeedback(
    "e1c2f3b4-1a3d-42f4-9a2b-3c1e2d4f0b1d",
    "a4a9cbcb-44d3-4ef7-a779-6fe0414c12c0", // Julia
    AppFeedbackEnum.FeatureRequest, // Angabe der neuen Kategorie
    "Eine Filterfunktion für Events nach Datum oder Thema wäre sehr hilfreich.",
    "2025-06-13T10:00:00Z" // Angepasstes ISO-8601 Format
  ),
  new AppFeedback(
    "b2a3c4d5-9e0f-46d3-ba1e-2c3d4e5f6a7b",
    "cfd2b580-4c53-4b5c-b90a-3b0b2345f6a0", // Lukas
    AppFeedbackEnum.PerformanceIssue, // Angabe der neuen Kategorie (Absturzproblem)
    "Die App stürzt bei mir manchmal beim Öffnen von Eventdetails ab (Android 12).",
    "2025-06-13T13:20:00Z" // Angepasstes ISO-8601 Format
  )
];