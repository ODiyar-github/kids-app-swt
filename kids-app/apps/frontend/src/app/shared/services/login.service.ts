/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO, UserMockups } from '@kids-app/share';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { AuthLoginDTO } from '@kids-app/share';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject = new BehaviorSubject<UserDTO | undefined>(undefined);
  private username = '';
  private password = '';
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(private readonly http: HttpClient) {}

  public login(username: string, password: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${environment.USER.URL}/login`, {
      params: { username, password }
    }).pipe(
      tap(user => {
        console.log('Benutzer eingeloggt:', user);
        this.username = username;
        this.password = password;
        this.currentUserSubject.next(user); 
      }),
      catchError(err => {
        console.error('Login-Fehler:', err);
        return throwError(() => new Error('Login fehlgeschlagen'));
      })
    );
  }

  public logout(): void {
    this.currentUserSubject.next(undefined);
    this.username = '';
    this.password = '';
  }

  public getCurrentUser(): UserDTO | undefined {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  public getUserInformation(uuid: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${environment.USER.URL}/${uuid}`);
  }

  public updateCurrentUser(): Observable<UserDTO> {
    const userData: UserDTO | undefined = this.getCurrentUser();
    console.log(userData); // Prüfe, ob userData korrekt ist
    if (!userData) {
      console.error('LoginService: updateCurrentUser aufgerufen, aber kein User eingeloggt.');
      return throwError(() => new Error('Kein Benutzer zum Aktualisieren angemeldet.'));
    }
    console.log('USER EXISTIERT!');
    const currentAuthLoginData = {
      username: this.username,
      password: this.password,
      user: userData
    };

    console.log('SCHICKE ANFRAGE AN BFF MIT PAYLOAD:', currentAuthLoginData);
    
    this.http.put<UserDTO>(`${environment.USER.URL}`, currentAuthLoginData).subscribe( (user) =>{
      console.log('WIR TESTEN OB DIE WERTE WIRKLICH BEKOMMEN: ', user);
    });
    return this.http.put<UserDTO>(`${environment.USER.URL}`, currentAuthLoginData).pipe(
      tap(updatedUser => {
        this.currentUserSubject.next(updatedUser);
        this.username = currentAuthLoginData.username;
        this.password = currentAuthLoginData.password;
        console.log('AuthLoginDTO erfolgreich im Backend aktualisiert und User-Status angepasst:', updatedUser);
      }),
      catchError(err => {
        console.error('Fehler beim Aktualisieren des AuthLoginDTO im Backend:', err);
        return throwError(() => new Error('Fehler beim Speichern der Benutzerdaten.'));
      })
    );
  }

  getAllUsers(): Observable<UserDTO[]> {
    console.log('DAS IST EIN TEST UM ZUSCHAUEN OB ICH USERDATEN BEKOMMEN: ', this.http.get<UserDTO[]>(`${environment.USER.URL}/all`));
    return this.http.get<UserDTO[]>(`${environment.USER.URL}/all`); 
  }

  public test(){
    console.log(this.username);
    console.log(this.password);
    this.updateCurrentUser();
  }
}