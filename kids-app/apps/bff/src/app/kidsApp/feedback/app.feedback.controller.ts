import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppFeedback } from "@kids-app/share";
import { Observable } from "rxjs";
import { AppFeedbackService } from "./app.feedback.service";

/**
 * @file app.feedback.controller.ts
 * @description Dieser Controller handhabt HTTP-Anfragen im Zusammenhang mit Anwendungs-Feedback.
 * Er bietet Endpunkte zum Abrufen aller Feedback-Einträge und zum Erstellen neuer Feedback-Einträge.
 * Die Swagger-Annotationen erleichtern die API-Dokumentation.
 */

/**
 * @class AppFeedbackController
 * @description NestJS Controller für Anwendungs-Feedback-bezogene API-Endpunkte.
 * Die `@ApiTags('feedback')`-Annotation gruppiert alle Endpunkte dieses Controllers unter der Kategorie "feedback" in der Swagger-Dokumentation.
 */
@ApiTags('feedback') // Gruppiert die Endpunkte dieses Controllers in der Swagger-Dokumentation unter "feedback".
@Controller('feedback') // Definiert den Basis-Pfad für alle Routen in diesem Controller als '/feedback'.
export class AppFeedbackController {
  /**
   * Erstellt eine Instanz von AppFeedbackController.
   * @param {AppFeedbackService} feedbackService - Der AppFeedbackService, der die Geschäftslogik für Feedback-Operationen bereitstellt.
   */
  constructor(private readonly feedbackService: AppFeedbackService) {}

  /**
   * @method getAllEvents
   * @description Ruft eine Liste aller vorhandenen Anwendungs-Feedback-Einträge ab.
   * @returns {Observable<AppFeedback[]>} Ein Observable, das ein Array von AppFeedback-Objekten emittiert.
   *
   * @ApiOperation - Swagger-Annotation: Beschreibt die Operation.
   * @ApiResponse - Swagger-Annotation: Beschreibt mögliche Antworten der API.
   */
  @Get() // Definiert einen GET-Endpunkt unter '/feedback'.
  @ApiOperation({ summary: 'Alle Appfeedbacks abrufen' }) // Swagger-Zusammenfassung für diesen Endpunkt.
  @ApiResponse({ status: 200, description: 'Liste aller Appfeedbacks', type: [AppFeedback] }) // Swagger-Antwort für Status 200 (Array von AppFeedback).
  getAllEvents(): Observable<AppFeedback[]> {
    console.log('📥 Anfrage: Alle Appfeedbacks'); // Loggt die Anfrage.
    return this.feedbackService.getAllFeedbacks(); // Ruft die getAllFeedbacks-Methode des AppFeedbackService auf.
  }

  /**
   * @method createFeedback
   * @description Erstellt einen neuen App-Feedback-Eintrag.
   * Erwartet das AppFeedback-Objekt im Request-Body.
   * @param {AppFeedback} appFeedback - Das AppFeedback-Objekt, das erstellt werden soll.
   * @returns {Observable<AppFeedback>} Ein Observable, das das erstellte AppFeedback-Objekt emittiert.
   *
   * @ApiOperation - Swagger-Annotation: Beschreibt die Operation.
   * @ApiResponse - Swagger-Annotation: Beschreibt mögliche Antworten der API.
   * @Body - NestJS-Decorator: Extrahiert den Request-Body.
   */
  @Post() // Definiert einen POST-Endpunkt unter '/feedback'.
  @ApiOperation({ summary: 'Ein Feedback wird erstellt' }) // Swagger-Zusammenfassung.
  @ApiResponse({ status: 200, description: 'Einzelnes appfeedback', type: AppFeedback }) // Swagger-Antwort für Status 200.
  createFeedback(@Body() appFeedback: AppFeedback): Observable<AppFeedback> { // Extrahiert das AppFeedback aus dem Request-Body.
    console.log(`📥 Anfrage: Create a feedback ${JSON.stringify(appFeedback)}`); // Loggt die Anfrage mit dem Feedback-Objekt.
    return this.feedbackService.createFeedback(appFeedback); // Ruft die createFeedback-Methode des AppFeedbackService auf.
  }
}
