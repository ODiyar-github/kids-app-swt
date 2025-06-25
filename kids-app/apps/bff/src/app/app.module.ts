import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KidsAppModule } from './kidsApp/kidsApp.module';
import { RmqClientService } from './kidsApp/services/rabbitmq.client.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    KidsAppModule
  ],
  controllers: [AppController],
  providers: [AppService, RmqClientService],
})
export class AppModule {}
