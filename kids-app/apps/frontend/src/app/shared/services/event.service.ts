import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { EventDTO, EventMockups } from '@kids-app/share'
import { environment } from "../../../environments/environment";

@Injectable()
export class EventService {
  constructor(private readonly httpClient: HttpClient) {}

  public getEventById(uuid: string): Observable<EventDTO> {
    return this.httpClient.get<EventDTO>(`${environment.EVENT.URL}/${uuid}`).pipe(
      catchError(() => {
        const mockEvent = EventMockups.find(event => event.uuid === uuid);
        if (mockEvent) {
          return of(mockEvent);
        } else {
          return throwError(() => new Error(`Mockup-Event mit UUID ${uuid} nicht gefunden.`));
        }
      })
    );
  }

  public getEventsByCategories(categories: string[]): Observable<EventDTO[]> {
    return this.httpClient.get<EventDTO[]>(`${environment.EVENT.URL}`).pipe(
      map(events =>
        events.filter(event =>
          event.category.some(cat => categories.includes(cat))
        )
      ),
      catchError(() => {
        const filteredMockEvents = EventMockups.filter(event =>
          event.category.some(cat => categories.includes(cat))
        );
        return of(filteredMockEvents);
      })
    );
  }

  public getEventList(): Observable<EventDTO[]> {
    return this.httpClient.get<EventDTO[]>(environment.EVENT.URL).pipe(
        catchError(error => {
          console.error('API fehlgeschlagen, keine Events:', error);
          return of(EventMockups);
        })
      );
  }
}