import { Module } from "@nestjs/common";
import { EventController } from "./event/event.controller";
import { UserController } from "./user/user.controller";
import { EventService } from "./event/event.service";
import { UserService } from "./user/user.service";
import { AmqpBroker } from "@libs/amqp/amqp";
import { AppController } from "./sendData/app.controller";
import { AppService } from "./sendData/app.service";
@Module({
    imports: [
      new AmqpBroker().getDASBroker(),
      new AmqpBroker().getStorageServiceBroker()
    ],
    controllers: [AppController, EventController, UserController],
    providers: [AppService, EventService, UserService],
  })
  export class KidsAppModule {}
  