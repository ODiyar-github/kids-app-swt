/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { EventDTO, EventMockups } from "@kids-app/share";

@Injectable()
export class TestService {
  constructor(private readonly httpClient: HttpClient) {}

  public testSend(): Observable<string> {
    return this.httpClient.get<string>(`${environment.MAIN.URL}/test`, { responseType: 'text' as 'json' });
  }
}