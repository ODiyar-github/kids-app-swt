import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * @file app.controller.ts
 * @description Dieser Controller handhabt HTTP-Anfragen im Zusammenhang mit dem Senden von Daten.
 * Er bietet einen Endpunkt zum Auslösen des Versands von Mockup-Daten.
 * Die Swagger-Annotationen erleichtern die API-Dokumentation.
 */

/**
 * @class AppController
 * @description NestJS Controller für Endpunkte zum Senden von Daten.
 * Die `@ApiTags('sendData')`-Annotation gruppiert alle Endpunkte dieses Controllers unter der Kategorie "sendData" in der Swagger-Dokumentation.
 */
@ApiTags('sendData') // Gruppiert die Endpunkte dieses Controllers in der Swagger-Dokumentation unter "sendData".
@Controller('sendData') // Definiert den Basis-Pfad für alle Routen in diesem Controller als '/sendData'.
export class AppController {
  /**
   * Erstellt eine Instanz von AppController.
   * @param {AppService} appService - Der AppService, der die Geschäftslogik für das Senden von Daten bereitstellt.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * @method sendData
   * @description Handhabt eine GET-Anfrage an den '/sendData'-Endpunkt.
   * Dieser Endpunkt dient als Test und löst den Versand von Mockup-Daten aus.
   * @returns {Observable<string>} Ein Observable, das einen Test-String emittiert, sobald die Operation abgeschlossen ist.
   *
   * @ApiOperation - Swagger-Annotation: Beschreibt die Operation.
   * @ApiResponse - Swagger-Annotation: Beschreibt mögliche Antworten der API.
   */
  @Get() // Definiert einen GET-Endpunkt unter '/sendData'.
  @ApiOperation({ summary: 'Test-Endpunkt', description: 'Empfängt ein EventDTO und gibt eine Test-Antwort zurück.' }) // Swagger-Zusammenfassung und Beschreibung.
  @ApiResponse({ status: 200, description: 'Erfolgreiche Antwort mit einem Test-String', type: String }) // Swagger-Antwort für Status 200.
  public sendData(): Observable<string> { // Methode von getTest zu sendData umbenannt
    console.log('Empfangene Anfrage vom Test'); // Loggt den Empfang der Anfrage.
    return this.appService.sendMockupData(); // Ruft die sendMockupData-Methode des AppService auf.
  }
}
