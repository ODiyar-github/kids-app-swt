/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { EventDTO, EventMockups } from '@kids-app/share'
import { environment } from "../../../environments/environment";

@Injectable()
export class EventService {
  constructor(private readonly httpClient: HttpClient) {}

  public getEventById(uuid: string): Observable<EventDTO> {
    return this.httpClient.get<EventDTO>(`${environment.EVENT.URL}/${uuid}`);
  }

  public getEventsByCategories(categories: string[]): Observable<EventDTO[]> {
    return this.httpClient.post<EventDTO[]>(`${environment.EVENT.URL}`, categories);
  }

  public getEventList(): Observable<EventDTO[]> {
    console.log('SCHICKE GET AN BFF')
    return this.httpClient.get<EventDTO[]>(`${environment.EVENT.URL}`);
  }
}