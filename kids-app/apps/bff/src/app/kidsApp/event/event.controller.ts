import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EventDTO } from '@kids-app/share';

/**
 * @file event.controller.ts
 * @description Dieser Controller handhabt HTTP-Anfragen im Zusammenhang mit Event-Operationen.
 * Er bietet Endpunkte zum Abrufen aller Events und zum Abrufen eines einzelnen Events nach seiner ID.
 * Die Swagger-Annotationen erleichtern die API-Dokumentation.
 */

/**
 * @class EventController
 * @description NestJS Controller für Event-bezogene API-Endpunkte.
 * Die `@ApiTags('Event')`-Annotation gruppiert alle Endpunkte dieses Controllers unter der Kategorie "Event" in der Swagger-Dokumentation.
 */
@ApiTags('Event') // Gruppiert die Endpunkte dieses Controllers in der Swagger-Dokumentation unter "Event".
@Controller('event') // Definiert den Basis-Pfad für alle Routen in diesem Controller als '/event'.
export class EventController {
  /**
   * Erstellt eine Instanz von EventController.
   * @param {EventService} eventService - Der EventService, der die Geschäftslogik für Event-Operationen bereitstellt.
   */
  constructor(private readonly eventService: EventService) {}

  /**
   * @method getAllEvents
   * @description Ruft eine Liste aller vorhandenen Events ab.
   * @returns {Observable<EventDTO[]>} Ein Observable, das ein Array von EventDTO-Objekten emittiert.
   *
   * @ApiOperation - Swagger-Annotation: Beschreibt die Operation.
   * @ApiResponse - Swagger-Annotation: Beschreibt mögliche Antworten der API.
   */
  @Get() // Definiert einen GET-Endpunkt unter '/event'.
  @ApiOperation({ summary: 'Alle Events abrufen' }) // Swagger-Zusammenfassung für diesen Endpunkt.
  @ApiResponse({ status: 200, description: 'Liste aller Events', type: [EventDTO] }) // Swagger-Antwort für Status 200 (Array von EventDTOs).
  getAllEvents(): Observable<EventDTO[]> {
    console.log('📥 Anfrage: Alle Events'); // Loggt die Anfrage.
    return this.eventService.getAllEvents(); // Ruft die getAllEvents-Methode des EventService auf.
  }

  /**
   * @method getEventById
   * @description Ruft ein einzelnes Event anhand seiner ID ab.
   * @param {string} id - Die ID des abzurufenden Events.
   * @returns {Observable<EventDTO>} Ein Observable, das das EventDTO des gefundenen Events emittiert.
   *
   * @ApiOperation - Swagger-Annotation: Beschreibt die Operation.
   * @ApiResponse - Swagger-Annotation: Beschreibt mögliche Antworten der API.
   * @ApiParam - Swagger-Annotation: Beschreibt den erwarteten Pfad-Parameter.
   */
  @Get(':id') // Definiert einen GET-Endpunkt mit einem dynamischen Pfad-Parameter ':id'.
  @ApiOperation({ summary: 'Ein Event nach ID abrufen' }) // Swagger-Zusammenfassung.
  @ApiParam({ name: 'id', description: 'ID des Events' }) // Swagger-Dokumentation für den 'id' Pfad-Parameter.
  @ApiResponse({ status: 200, description: 'Einzelnes Event', type: EventDTO }) // Swagger-Antwort für Status 200.
  getEventById(@Param('id') id: string): Observable<EventDTO> { // Extrahiert die 'id' aus den Pfad-Parametern.
    console.log(`📥 Anfrage: Event mit ID ${id}`); // Loggt die Anfrage.
    return this.eventService.getEventById(id); // Ruft die getEventById-Methode des EventService auf.
  }

  /**
   * @method updateEvent
   * @brief Verarbeitet PUT-Anfragen zur Aktualisierung eines Events.
   *
   * <p>Dieser Endpunkt empfängt ein {@link EventDTO}-Objekt im Request-Body.
   * Er leitet die Aktualisierungsanfrage an den {@link EventService} weiter,
   * welcher wiederum die Kommunikation mit dem tieferliegenden Microservice (z.B. über RabbitMQ)
   * zur persistenten Speicherung der Änderungen übernimmt.</p>
   *
   * <p>Die UUID des zu aktualisierenden Events muss im übermittelten {@link EventDTO} enthalten sein.
   * Dieses Design ermöglicht eine flexiblere Handhabung der Event-Aktualisierungen,
   * beispielsweise um Feedback hinzuzufügen oder andere Event-Details zu modifizieren.</p>
   *
   * @param eventDto Das {@link EventDTO}-Objekt, das die vollständigen aktualisierten Event-Daten
   * sowie die UUID des zu aktualisierenden Events enthält.
   * @returns Ein {@link Observable}, das das aktualisierte {@link EventDTO}-Objekt emittiert,
   * sobald die Aktualisierung vom Backend-Service bestätigt wurde.
   *
   * @Put() - Definiert diesen Endpunkt als PUT-Methode. Da keine Pfadparameter angegeben sind,
   * wird der Endpunkt basierend auf dem Controller-Präfix (z.B. `/api/events`) aufgerufen.
   * @ApiOperation - Beschreibt die Funktion des API-Endpunkts in der Swagger-Dokumentation.
   * @ApiResponse - Dokumentiert die erwartete HTTP-Antwort bei Erfolg (Status 200) und den Rückgabetyp.
   */
  @Put() // Endpunkt für PUT /api/events (falls Controller-Präfix '/api/events' ist)
  @ApiOperation({ summary: 'Ein Event aktualisieren' })
  @ApiResponse({ status: 200, description: 'Das aktualisierte Event', type: EventDTO })
  updateEvent(@Body() eventDto: EventDTO): Observable<EventDTO> {
    console.log(`📥 Anfrage: Event aktualisieren für UUID: ${eventDto.uuid}`);
    // Optional: uuid im DTO setzen, falls es im Body fehlt oder abweichen könnte
    return this.eventService.updateEvent(eventDto); // BFF EventService ruft RabbitMQ auf
  }
}
