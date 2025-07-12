/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '@kids-app/share';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthLoginDTO } from '@kids-app/share';

/**
 * @file login.service.ts
 * @description Dieser Dienst verwaltet die Benutzerauthentifizierung und den Anmeldestatus in der Angular-Anwendung.
 * Er bietet Methoden zum Anmelden, Abmelden, Abrufen des aktuellen Benutzers und Aktualisieren von Benutzerinformationen.
 */

/**
 * @class LoginService
 * @description Ein Angular Service, der für die Benutzerauthentifizierung und die Verwaltung des Anmeldestatus zuständig ist.
 * Er verwendet `HttpClient` für die Kommunikation mit der Backend-API und `BehaviorSubject` zur Verwaltung des aktuellen Benutzerstatus.
 */
@Injectable({
  /**
   * @property {string} providedIn - Gibt an, dass dieser Dienst im Root-Injector bereitgestellt wird,
   * wodurch er in der gesamten Anwendung als Singleton verfügbar ist.
   */
  providedIn: 'root'
})
export class LoginService {
  /**
   * @private
   * @property {BehaviorSubject<UserDTO | undefined>} currentUserSubject - Ein BehaviorSubject, das den aktuellen angemeldeten Benutzer speichert.
   * Es emittiert den letzten Wert an neue Abonnenten und den aktuellen Wert an alle Abonnenten.
   * Initial ist es `undefined`, was bedeutet, dass kein Benutzer angemeldet ist.
   */
  private currentUserSubject = new BehaviorSubject<UserDTO | undefined>(undefined);

  /**
   * @private
   * @property {string} username - Speichert den Benutzernamen des aktuell angemeldeten Benutzers.
   */
  private username = '';

  /**
   * @private
   * @property {string} password - Speichert das Passwort des aktuell angemeldeten Benutzers.
   * Hinweis: Das Speichern von Passwörtern im Frontend ist aus Sicherheitsgründen nicht empfohlen.
   * Dies sollte nur für Mock- oder Testzwecke verwendet werden.
   */
  private password = '';

  /**
   * @public
   * @property {Observable<UserDTO | undefined>} currentUser$ - Ein Observable, das den aktuellen Benutzerstatus als Stream bereitstellt.
   * Komponenten können diesen Stream abonnieren, um auf Änderungen des Anmeldestatus zu reagieren.
   */
  public currentUser$ = this.currentUserSubject.asObservable();

  /**
   * Erstellt eine Instanz von LoginService.
   * @param {HttpClient} http - Der Angular HttpClient, der für das Senden von HTTP-Anfragen verwendet wird.
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Versucht, einen Benutzer mit den angegebenen Anmeldeinformationen anzumelden.
   * Bei erfolgreicher Anmeldung wird der Benutzer im `currentUserSubject` gespeichert.
   * @param {string} username - Der Benutzername für die Anmeldung.
   * @param {string} password - Das Passwort für die Anmeldung.
   * @returns {Observable<UserDTO>} Ein Observable, das das UserDTO des angemeldeten Benutzers emittiert.
   * @throws {Error} Wirft einen Fehler, wenn die Anmeldung fehlschlägt.
   */
  public login(username: string, password: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${environment.USER.URL}/login`, {
      params: { username, password } // Sendet Benutzername und Passwort als Query-Parameter
    }).pipe(
      tap(user => {
        this.username = username; // Speichert den Benutzernamen
        this.password = password; // Speichert das Passwort
        this.currentUserSubject.next(user); // Aktualisiert den aktuellen Benutzer im Subject
      }),
      catchError(err => {
        // Bei einem Fehler während der Anmeldung:
        console.error('Login-Fehler:', err); // Loggt den Fehler
        return throwError(() => new Error('Login fehlgeschlagen')); // Wirft einen neuen Fehler
      })
    );
  }

  /**
   * Meldet den aktuell angemeldeten Benutzer ab.
   * Setzt den `currentUserSubject` auf `undefined` und löscht die gespeicherten Anmeldeinformationen.
   */
  public logout(): void {
    this.currentUserSubject.next(undefined); // Setzt den aktuellen Benutzer auf undefined
    this.username = ''; // Löscht den Benutzernamen
    this.password = ''; // Löscht das Passwort
  }

  /**
   * Gibt das aktuelle UserDTO des angemeldeten Benutzers zurück.
   * @returns {UserDTO | undefined} Das UserDTO des angemeldeten Benutzers oder `undefined`, wenn niemand angemeldet ist.
   */
  public getCurrentUser(): UserDTO | undefined {
    return this.currentUserSubject.value; // Gibt den aktuellen Wert des BehaviorSubjects zurück
  }

  /**
   * Überprüft, ob ein Benutzer aktuell angemeldet ist.
   * @returns {boolean} `true`, wenn ein Benutzer angemeldet ist, `false` sonst.
   */
  public isLoggedIn(): boolean {
    return !!this.currentUserSubject.value; // Prüft, ob ein Wert im Subject vorhanden ist
  }

  /**
   * Ruft die vollständigen Benutzerinformationen für eine bestimmte UUID von der Backend-API ab.
   * @param {string} uuid - Die eindeutige Kennung (UUID) des abzurufenden Benutzers.
   * @returns {Observable<UserDTO>} Ein Observable, das das UserDTO des gefundenen Benutzers emittiert.
   */
  public getUserInformation(uuid: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${environment.USER.URL}/${uuid}`);
  }

  /**
   * Aktualisiert die Informationen des aktuell angemeldeten Benutzers im Backend.
   * Sendet das aktuelle `AuthLoginDTO` (mit aktualisiertem UserDTO) an die Backend-API.
   * Bei Erfolg wird der `currentUserSubject` mit den aktualisierten Benutzerdaten aktualisiert.
   * @returns {Observable<UserDTO>} Ein Observable, das das aktualisierte UserDTO vom Server zurückgibt.
   * @throws {Error} Wirft einen Fehler, wenn kein Benutzer angemeldet ist oder die Aktualisierung fehlschlägt.
   */
  public updateCurrentUser(): Observable<UserDTO> {
    const userData: UserDTO | undefined = this.getCurrentUser();
    if (!userData) {
      return throwError(() => new Error('Kein Benutzer zum Aktualisieren angemeldet.'));
    }
    const currentAuthLoginData: AuthLoginDTO = {
      username: this.username,
      password: this.password,
      user: userData
    };

    return this.http.put<UserDTO>(`${environment.USER.URL}`, currentAuthLoginData).pipe(
      tap(updatedUser => {
        this.currentUserSubject.next(updatedUser); // Aktualisiert den aktuellen Benutzer im Subject
        this.username = currentAuthLoginData.username; // Stellt sicher, dass Benutzername aktuell ist
        this.password = currentAuthLoginData.password; // Stellt sicher, dass Passwort aktuell ist
      }),
      catchError(() => {
       return throwError(() => new Error('Fehler beim Speichern der Benutzerdaten.')); // Wirft einen neuen Fehler
      })
    );
  }

  /**
   * Ruft eine Liste aller Benutzer von der Backend-API ab.
   * @returns {Observable<UserDTO[]>} Ein Observable, das ein Array von UserDTO-Objekten vom Server zurückgibt.
   */
  getAllUsers(): Observable<UserDTO[]> {
    console.log('DAS IST EIN TEST UM ZUSCHAUEN OB ICH USERDATEN BEKOMMEN: ', this.http.get<UserDTO[]>(`${environment.USER.URL}/all`)); // Debug-Log
    return this.http.get<UserDTO[]>(`${environment.USER.URL}/all`);
  }
}
