/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppFeedback } from "@kids-app/share";
import { environment } from "../../../environments/environment";

/**
 * @file feedback.service.ts
 * @description Dieser Dienst ist für die Interaktion mit der Backend-API bezüglich des Anwendungs-Feedbacks zuständig.
 * Er bietet Methoden zum Senden und Abrufen von Feedback-Einträgen.
 */

/**
 * @class FeedbackService
 * @description Ein Angular Service, der HTTP-Anfragen für Feedback-Operationen an das Backend sendet.
 * Er ist als `Injectable` markiert, sodass er in anderen Komponenten und Diensten injiziert werden kann.
 */
@Injectable()
export class FeedbackService {
  /**
   * Erstellt eine Instanz von FeedbackService.
   * @param {HttpClient} httpClient - Der Angular HttpClient, der für das Senden von HTTP-Anfragen verwendet wird.
   */
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Sendet ein neues Feedback-Objekt an die Backend-API.
   * @param {AppFeedback} feedback - Das zu sendende Feedback-Objekt.
   * @returns {Observable<AppFeedback>} Ein Observable, das das gesendete Feedback-Objekt vom Server zurückgibt.
   */
  public sendFeedBack(feedback: AppFeedback): Observable<AppFeedback> {
    return this.httpClient.post<AppFeedback>(`${environment.FEEDBACK.URL}`,feedback);
  }

  /**
   * Ruft alle vorhandenen Feedback-Einträge von der Backend-API ab.
   * @returns {Observable<AppFeedback[]>} Ein Observable, das ein Array von AppFeedback-Objekten vom Server zurückgibt.
   */
  public getAllFeedbacks(): Observable<AppFeedback[]> {
    return this.httpClient.get<AppFeedback[]>(`${environment.FEEDBACK.URL}`);
  }
}
