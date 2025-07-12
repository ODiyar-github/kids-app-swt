import { Controller, Get, Param } from '@nestjs/common';
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
}
