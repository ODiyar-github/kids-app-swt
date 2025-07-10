import { Inject, Injectable } from '@nestjs/common';
import { AmqpBrokerQueues, RmqPatterns } from "@libs/amqp/amqp";
import { AuthLoginDTO, UserDTO } from '@kids-app/share'
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class UserService {
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly client: ClientProxy
  ) {}

  login(username: string, password: string): Observable<UserDTO> {
    const payload = { username, password };
    console.log('📨 Login-Daten an Backend senden:', payload);
    return this.client.send(RmqPatterns.AUTH.LOGIN, payload);
  }

  getUser(id: string): Observable<UserDTO> {
    console.log(`📨 Anfrage für User mit UUID ${id}`);
    return this.client.send(RmqPatterns.AUTH.GET_USER_BY_ID, { id });
  }
  updateAuthLoginDTO(authLoginDTO: AuthLoginDTO): Observable<UserDTO> {
    // Sende das komplette AuthLoginDTO an das Spring Boot Backend
    console.log(`Daten werden nun ans BACKEND GESCHICKT MIT DER AUTHLOGINDTO VOM FRONTEND: `, authLoginDTO);
    return this.client.send<UserDTO>(RmqPatterns.AUTH.UPDATE_USER, authLoginDTO);
  }
  getAllUser():Observable<UserDTO[]>{
    console.log(`Alle daten werden ausgegbeen`);
    return this.client.send<UserDTO[]>(RmqPatterns.AUTH.GET_ALL_USER, {});
  }
}