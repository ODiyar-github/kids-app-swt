import { Inject, Injectable } from '@nestjs/common';
import { AmqpBrokerQueues, RmqPatterns } from "@libs/amqp/amqp";
import { AuthLoginDTO, UserDTO } from '@kids-app/share'
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

/**
 * @file user.service.ts
 * @description Dieser Dienst ist für die Geschäftslogik im Zusammenhang mit Benutzeroperationen zuständig.
 * Er kommuniziert mit dem Kids App Storage Service (über AMQP), um Benutzerdaten zu verwalten,
 * einschließlich Login, Abrufen einzelner Benutzer, Aktualisierung von Benutzerdaten und Abrufen aller Benutzer.
 */

/**
 * @class UserService
 * @description NestJS Service, der die Kommunikation mit dem Storage Service für Benutzerdaten handhabt.
 * Er verwendet `ClientProxy`, um Nachrichten an die RabbitMQ-Warteschlange zu senden.
 */
@Injectable()
export class UserService {
  /**
   * Erstellt eine Instanz von UserService.
   * @param {ClientProxy} client - Der injizierte ClientProxy für die Kommunikation mit dem Kids App Storage Service.
   * Die Injektion erfolgt über das `@Inject`-Decorator mit dem Warteschlangennamen.
   */
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly client: ClientProxy
  ) {}

  /**
   * @method login
   * @description Sendet eine Login-Anfrage an den Storage Service.
   * @param {string} username - Der Benutzername für den Login.
   * @param {string} password - Das Passwort für den Login.
   * @returns {Observable<UserDTO>} Ein Observable, das das UserDTO des angemeldeten Benutzers emittiert.
   */
  login(username: string, password: string): Observable<UserDTO> {
    const payload = { username, password };
    console.log('📨 Login-Daten an Backend senden:', payload); // Loggt die gesendeten Daten.
    // Sendet eine Nachricht mit dem LOGIN-Muster und dem Payload an den ClientProxy.
    return this.client.send(RmqPatterns.AUTH.LOGIN, payload);
  }

  /**
   * @method getUser
   * @description Sendet eine Anfrage zum Abrufen eines Benutzers anhand seiner ID an den Storage Service.
   * @param {string} id - Die UUID des abzurufenden Benutzers.
   * @returns {Observable<UserDTO>} Ein Observable, das das UserDTO des gefundenen Benutzers emittiert.
   */
  getUser(id: string): Observable<UserDTO> {
    console.log(`📨 Anfrage für User mit UUID ${id}`); // Loggt die Anfrage.
    // Sendet eine Nachricht mit dem GET_USER_BY_ID-Muster und der Benutzer-ID an den ClientProxy.
    return this.client.send(RmqPatterns.AUTH.GET_USER_BY_ID, { id });
  }

  /**
   * @method updateAuthLoginDTO
   * @description Sendet eine Anfrage zur Aktualisierung eines AuthLoginDTO und des zugehörigen Benutzers
   * an den Storage Service.
   * @param {AuthLoginDTO} authLoginDTO - Das AuthLoginDTO-Objekt, das die zu aktualisierenden Benutzerdaten enthält.
   * @returns {Observable<UserDTO>} Ein Observable, das das aktualisierte UserDTO emittiert.
   */
  updateAuthLoginDTO(authLoginDTO: AuthLoginDTO): Observable<UserDTO> {
    console.log(`Daten werden nun ans BACKEND GESCHICKT MIT DER AUTHLOGINDTO VOM FRONTEND: `, authLoginDTO); // Loggt die gesendeten Daten.
    // Sendet eine Nachricht mit dem UPDATE_USER-Muster und dem AuthLoginDTO an den ClientProxy.
    return this.client.send<UserDTO>(RmqPatterns.AUTH.UPDATE_USER, authLoginDTO);
  }

  /**
   * @method getAllUser
   * @description Sendet eine Anfrage zum Abrufen aller Benutzer an den Storage Service.
   * @returns {Observable<UserDTO[]>} Ein Observable, das ein Array von UserDTO-Objekten emittiert.
   */
  getAllUser(): Observable<UserDTO[]> {
    console.log(`Alle daten werden ausgegbeen`); // Loggt die Anfrage.
    // Sendet eine leere Nachricht mit dem GET_ALL_USER-Muster an den ClientProxy, um alle Benutzer abzurufen.
    return this.client.send<UserDTO[]>(RmqPatterns.AUTH.GET_ALL_USER, {});
  }
}
