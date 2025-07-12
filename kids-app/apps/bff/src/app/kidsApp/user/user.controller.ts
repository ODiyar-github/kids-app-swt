import { Controller, Get, Query, Param, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDTO, UserDTO } from '@kids-app/share';
import { Observable } from 'rxjs';

/**
 * @file user.controller.ts
 * @description Dieser Controller handhabt HTTP-Anfragen im Zusammenhang mit Benutzeroperationen.
 * Er bietet Endpunkte für Benutzeranmeldung, Abrufen von Benutzerdaten und Aktualisierung von Benutzerprofilen.
 * Die Swagger-Annotationen erleichtern die API-Dokumentation.
 */

/**
 * @class UserController
 * @description NestJS Controller für Benutzer-bezogene API-Endpunkte.
 * Die `@ApiTags('User')`-Annotation gruppiert alle Endpunkte dieses Controllers unter der Kategorie "User" in der Swagger-Dokumentation.
 */
@ApiTags('User') // Gruppiert die Endpunkte dieses Controllers in der Swagger-Dokumentation unter "User".
@Controller('user') // Definiert den Basis-Pfad für alle Routen in diesem Controller als '/user'.
export class UserController {
  /**
   * Erstellt eine Instanz von UserController.
   * @param {UserService} userService - Der UserService, der die Geschäftslogik für Benutzeroperationen bereitstellt.
   */
  constructor(private readonly userService: UserService) {}

  /**
   * @method login
   * @description Handhabt den Benutzer-Login.
   * Erwartet Benutzername und Passwort als Query-Parameter und gibt das UserDTO bei erfolgreicher Anmeldung zurück.
   * @param {string} username - Der Benutzername des Benutzers, der sich anmelden möchte.
   * @param {string} password - Das Passwort des Benutzers, der sich anmelden möchte.
   * @returns {Observable<UserDTO>} Ein Observable, das das UserDTO des angemeldeten Benutzers emittiert.
   *
   * @ApiOperation - Swagger-Annotation: Beschreibt die Operation.
   * @ApiResponse - Swagger-Annotation: Beschreibt mögliche Antworten der API.
   * @ApiQuery - Swagger-Annotation: Beschreibt die erwarteten Query-Parameter.
   */
  @Get('login') // Definiert einen GET-Endpunkt unter '/user/login'.
  @ApiOperation({ summary: 'User Login' }) // Swagger-Zusammenfassung für diesen Endpunkt.
  @ApiQuery({ name: 'username', description: 'Benutzername des Users' }) // Swagger-Dokumentation für den 'username' Query-Parameter.
  @ApiQuery({ name: 'password', description: 'Passwort des Users' }) // Swagger-Dokumentation für den 'password' Query-Parameter.
  @ApiResponse({ status: 200, description: 'User bei erfolgreichem Login', type: UserDTO }) // Swagger-Antwort für Status 200.
  login(
    @Query('username') username: string, // Extrahiert den 'username' aus den Query-Parametern.
    @Query('password') password: string // Extrahiert das 'password' aus den Query-Parametern.
  ): Observable<UserDTO> {
    console.log(`🔐 Loginversuch für ${username}`); // Loggt den Login-Versuch.
    return this.userService.login(username, password); // Ruft die Login-Methode des UserService auf.
  }

  /**
   * @method getAllUser
   * @description Ruft eine Liste aller registrierten Benutzer ab.
   * @returns {Observable<UserDTO[]>} Ein Observable, das ein Array von UserDTO-Objekten emittiert.
   *
   * @ApiOperation - Swagger-Annotation: Beschreibt die Operation.
   * @ApiResponse - Swagger-Annotation: Beschreibt mögliche Antworten der API.
   */
  @Get('all') // Definiert einen GET-Endpunkt unter '/user/all'.
  @ApiOperation({ summary: 'Get All User' }) // Swagger-Zusammenfassung.
  @ApiResponse({ status: 200, description: 'Alle User', type: [UserDTO] }) // Swagger-Antwort für Status 200 (Array von UserDTOs).
  @ApiResponse({ status: 404, description: 'Users nicht gefunden' }) // Swagger-Antwort für Status 404.
  getAllUser(): Observable<UserDTO[]> {
    return this.userService.getAllUser(); // Ruft die getAllUser-Methode des UserService auf.
  }

  /**
   * @method getUser
   * @description Ruft einen einzelnen Benutzer anhand seiner UUID ab.
   * @param {string} uuid - Die eindeutige Kennung (UUID) des abzurufenden Benutzers.
   * @returns {Observable<UserDTO>} Ein Observable, das das UserDTO des gefundenen Benutzers emittiert.
   *
   * @ApiOperation - Swagger-Annotation: Beschreibt die Operation.
   * @ApiResponse - Swagger-Annotation: Beschreibt mögliche Antworten der API.
   * @ApiParam - Swagger-Annotation: Beschreibt den erwarteten Pfad-Parameter.
   */
  @Get(':uuid') // Definiert einen GET-Endpunkt mit einem dynamischen Pfad-Parameter ':uuid'.
  @ApiOperation({ summary: 'User nach UUID abrufen' }) // Swagger-Zusammenfassung.
  @ApiParam({ name: 'uuid', description: 'UUID des Users' }) // Swagger-Dokumentation für den 'uuid' Pfad-Parameter.
  @ApiResponse({ status: 200, description: 'Einzelner User', type: UserDTO }) // Swagger-Antwort für Status 200.
  getUser(@Param('uuid') uuid: string): Observable<UserDTO> { // Extrahiert die 'uuid' aus den Pfad-Parametern.
    console.log(`📥 Anfrage: User mit UUID ${uuid}`); // Loggt die Anfrage.
    return this.userService.getUser(uuid); // Ruft die getUser-Methode des UserService auf.
  }

  /**
   * @method updateAuthLoginDTO
   * @description Aktualisiert ein AuthLoginDTO und den zugehörigen Benutzer.
   * Erwartet das komplette AuthLoginDTO-Objekt im Request-Body.
   * @param {AuthLoginDTO} authLoginDTO - Das AuthLoginDTO-Objekt, das die zu aktualisierenden Benutzerdaten enthält.
   * @returns {Observable<UserDTO>} Ein Observable, das das aktualisierte UserDTO emittiert.
   *
   * @ApiOperation - Swagger-Annotation: Beschreibt die Operation.
   * @ApiResponse - Swagger-Annotation: Beschreibt mögliche Antworten der API.
   * @Body - NestJS-Decorator: Extrahiert den Request-Body.
   */
  @Put() // Definiert einen PUT-Endpunkt unter '/user'.
  @ApiOperation({ summary: 'AuthLoginDTO und zugehörigen Benutzer aktualisieren' }) // Swagger-Zusammenfassung.
  @ApiResponse({ status: 200, description: 'Aktualisierter User', type: UserDTO }) // Swagger-Antwort für Status 200.
  @ApiResponse({ status: 404, description: 'AuthLoginDTO oder User nicht gefunden' }) // Swagger-Antwort für Status 404.
  updateAuthLoginDTO(
    @Body() authLoginDTO: AuthLoginDTO // Extrahiert das AuthLoginDTO aus dem Request-Body.
  ): Observable<UserDTO> {
    return this.userService.updateAuthLoginDTO(authLoginDTO); // Ruft die updateAuthLoginDTO-Methode des UserService auf.
  }
}
