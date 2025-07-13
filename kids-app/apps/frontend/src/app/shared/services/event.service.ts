/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { EventDTO, EventMockups } from '@kids-app/share'
import { environment } from "../../../environments/environment";

/**
 * @file event.service.ts
 * @description Dieser Dienst ist für die Interaktion mit der Backend-API bezüglich der Event-Daten zuständig.
 * Er bietet Methoden zum Abrufen einzelner Events und Listen von Events.
 */

/**
 * @class EventService
 * @description Ein Angular Service, der HTTP-Anfragen für Event-Operationen an das Backend sendet.
 * Er ist als `Injectable` markiert, sodass er in anderen Komponenten und Diensten injiziert werden kann.
 */
@Injectable()
export class EventService {
  /**
   * Erstellt eine Instanz von EventService.
   * @param {HttpClient} httpClient - Der Angular HttpClient, der für das Senden von HTTP-Anfragen verwendet wird.
   */
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Ruft ein einzelnes Event von der Backend-API anhand seiner UUID ab.
   * @param {string} uuid - Die eindeutige Kennung (UUID) des abzurufenden Events.
   * @returns {Observable<EventDTO>} Ein Observable, das das gefundene EventDTO-Objekt vom Server zurückgibt.
   */
  public getEventById(uuid: string): Observable<EventDTO> {
    return this.httpClient.get<EventDTO>(`${environment.EVENT.URL}/${uuid}`);
  }

  /**
   * Ruft eine Liste aller Events von der Backend-API ab.
   * @returns {Observable<EventDTO[]>} Ein Observable, das ein Array von EventDTO-Objekten vom Server zurückgibt.
   */
  public getEventList(): Observable<EventDTO[]> {
    return this.httpClient.get<EventDTO[]>(`${environment.EVENT.URL}`);
  }

  /**
   * @method updateEvent
   * @description Aktualisiert ein Event-Objekt im Backend, z.B. um neues Feedback hinzuzufügen.
   * @param {EventDTO} event - Das zu aktualisierende Event-Objekt, das das neue Feedback enthält.
   * @returns {Observable<EventDTO>} Ein Observable, das das aktualisierte EventDTO-Objekt zurückgibt.
   */
    public updateEvent(event: EventDTO): Observable<EventDTO> {
      // Der PUT-Endpunkt im BFF sollte das Event anhand seiner UUID aktualisieren.
      // Beispiel: PUT /api/events/{uuid}
      return this.httpClient.put<EventDTO>(`${environment.EVENT.URL}`, event);
    }
}
