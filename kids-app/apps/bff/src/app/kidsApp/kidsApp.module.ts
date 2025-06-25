import { Module } from "@nestjs/common";
import { EventController } from "./event/event.controller";
import { UserController } from "./user/user.controller";
import { EventService } from "./event/event.service";
import { UserService } from "./user/user.service";
import { RmqClientService } from "./services/rabbitmq.client.service";
import { TestService } from "./test/test.service";
import { TestController } from "./test/test.controller";
@Module({
    imports: [],
    controllers: [EventController, UserController, TestController],
    providers: [EventService, UserService, TestService, RmqClientService],
  })
  export class KidsAppModule {}
  