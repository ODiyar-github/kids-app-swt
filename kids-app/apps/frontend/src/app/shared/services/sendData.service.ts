/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

/**
 * @file send-data.service.ts
 * @description Dieser Dienst ist für das Senden von Daten (in diesem Fall Mock-Daten) an einen Backend-Endpunkt zuständig.
 * Er demonstriert eine einfache HTTP-GET-Anfrage.
 */

/**
 * @class SendDataService
 * @description Ein Angular Service, der HTTP-Anfragen zum Senden von Daten an das Backend sendet.
 * Er ist als `Injectable` markiert, sodass er in anderen Komponenten und Diensten injiziert werden kann.
 */
@Injectable()
export class SendDataService {
  /**
   * Erstellt eine Instanz von SendDataService.
   * @param {HttpClient} httpClient - Der Angular HttpClient, der für das Senden von HTTP-Anfragen verwendet wird.
   */
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Sendet eine HTTP-GET-Anfrage an den `sendData`-Endpunkt der Haupt-API.
   * Die Antwort des Servers wird in der Konsole geloggt.
   * Diese Methode ist derzeit für das Senden von Mock-Daten konzipiert und hat keinen direkten Rückgabewert.
   */
  public sendData(): void {
    // Führt eine HTTP-GET-Anfrage an die konfigurierte URL aus.
    // Das Ergebnis der Anfrage wird abonniert, um die Antwort zu verarbeiten.
    console.log('DATEN PUNKT: ',this.httpClient.get<string>(`${environment.MAIN.URL}/sendData`).subscribe((value=>{
      // Die empfangene Antwort wird zurückgegeben (innerhalb des subscribe-Callbacks).
      // Beachten Sie, dass der Wert von console.log hier das Subscription-Objekt ist,
      // nicht der tatsächliche Wert, der vom Server zurückkommt.
      return value;
    })))
  }
}
