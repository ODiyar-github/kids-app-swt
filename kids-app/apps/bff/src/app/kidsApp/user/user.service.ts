import { Inject, Injectable } from '@nestjs/common';
import { AmqpBrokerQueues, RmqPatterns } from "@libs/amqp/amqp";
import { UserDTO } from '@kids-app/share'
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

  getUser(uuid: string): Observable<UserDTO> {
    console.log(`📨 Anfrage für User mit UUID ${uuid}`);
    return this.client.send(RmqPatterns.AUTH.GET_USER_BY_ID, { uuid });
  }
}