import { Module } from "@nestjs/common";
import { EventController } from "./event/event.controller";
import { UserController } from "./user/user.controller";
import { EventService } from "./event/event.service";
import { UserService } from "./user/user.service";
import { RmqClientService } from "./services/rabbitmq.client.service";
@Module({
    imports: [],
    controllers: [EventController, UserController],
    providers: [EventService, UserService, RmqClientService],
  })
  export class KidsAppModule {}
  