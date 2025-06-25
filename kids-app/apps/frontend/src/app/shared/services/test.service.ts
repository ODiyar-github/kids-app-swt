/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, throwError } from "rxjs";

@Injectable()
export class TestService {
  constructor(private readonly httpClient: HttpClient) {}

  public testSend(): Observable<string> {
    return this.httpClient.get<string>(`http://localhost:3000/api/test`);
  }
}