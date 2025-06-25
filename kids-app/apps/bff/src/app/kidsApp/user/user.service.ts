import { Injectable } from '@nestjs/common';
import { RmqClientService } from '../services/rabbitmq.client.service';
import { RmqPatterns, UserDTO } from '@kids-app/share';
import { Observable } from 'rxjs';
@Injectable()
export class UserService {
  private client = this.rmqClient.getClient();

  constructor(private readonly rmqClient: RmqClientService) {}

  login(username: string, password: string):Observable<UserDTO> {
    return this.client.send(RmqPatterns.USER_LOGIN, { username, password });
  }

  getUser(uuid: string):Observable<UserDTO> {
    return this.client.send(RmqPatterns.GET_USER_BY_ID, uuid);
  }
}