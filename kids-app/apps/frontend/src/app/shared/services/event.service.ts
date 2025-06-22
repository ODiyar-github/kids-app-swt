import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { EventDTO, EventMockups } from '@kids-app/share'
import { environment } from "../../../environments/environment";

@Injectable()
export class EventService {
  constructor(private readonly httpClient: HttpClient) {}

  public getEventById(uuid: string): Observable<EventDTO> {
    return this.httpClient.get<EventDTO>(`${environment.EVENT.URL}/${uuid}`).pipe(
      catchError(()=>{
        return of(EventMockups[0]);
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