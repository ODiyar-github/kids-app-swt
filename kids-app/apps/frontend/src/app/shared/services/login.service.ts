import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO, UserMockups } from '@kids-app/share';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable()
export class LoginService {
  private currentUserSubject = new BehaviorSubject<UserDTO | undefined>(undefined);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  public login(username: string, password: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${environment.USER.URL}/login`, {
      params: { username, password }
    }).pipe(
      catchError((error) => {
        const localUser = UserMockups.find(
          user => user.email.toLowerCase() === username.toLowerCase()
        );

        if (localUser) {
          this.currentUserSubject.next(localUser);
          return of(localUser);
        }
        return throwError(() => new Error('Login fehlgeschlagen: Kein lokaler User gefunden.'), error);
      }),
      tap((user) => this.currentUserSubject.next(user)) // bei Erfolg setzen
    );
  }

  public logout(): void {
    this.currentUserSubject.next(undefined);
  }

  public getCurrentUser(): UserDTO | undefined {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}