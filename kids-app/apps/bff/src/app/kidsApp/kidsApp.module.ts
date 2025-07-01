import { Module } from "@nestjs/common";
import { EventController } from "./event/event.controller";
import { UserController } from "./user/user.controller";
import { EventService } from "./event/event.service";
import { UserService } from "./user/user.service";
import { TestService } from "./test/test.service";
import { TestController } from "./test/test.controller";
import { AmqpBroker } from "@kids-app/share";
import { AppController } from "./sendData/app.controller";
import { AppService } from "./sendData/app.service";
@Module({
    imports: [
      new AmqpBroker().getDASBroker(),
      new AmqpBroker().getStorageServiceBroker()
    ],
    controllers: [AppController, EventController, UserController, TestController],
    providers: [AppService, EventService, UserService, TestService],
  })
  export class KidsAppModule {}
  