/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { UserDTO, UserMockups } from '@kids-app/share'
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  public getUserInformation(uuid: string): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(`${environment.USER.URL}/${uuid}`).pipe(
      map(user => {
        if (!user || !user.userId) {
          const fallback = UserMockups.find(u => u.userId === uuid) ?? UserMockups[0];
          return fallback;
        }
        return user;
      }),
      catchError(() => {
        const fallback = UserMockups.find(u => u.userId === uuid) ?? UserMockups[0];
        return of(fallback);
      })
    );
  }
  
}