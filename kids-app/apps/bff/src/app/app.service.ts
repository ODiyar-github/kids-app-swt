import { Injectable, OnModuleInit } from '@nestjs/common';
import { RmqClientService } from './kidsApp/services/rabbitmq.client.service';
import { RmqPatterns, JsonData, UserMockups, EventMockups, AppFeedbackMockup } from '@kids-app/share';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  private client = this.rmqClient.getClient();

  constructor(private readonly rmqClient: RmqClientService) {}

  async onModuleInit() {
    await this.sendMockupData();
  }

  private async sendMockupData() {
    const jsonData: JsonData = {
      _id: '',
      _rev: '',
      userData: UserMockups,
      eventData: EventMockups,
      feedBackAppData: AppFeedbackMockup,
    };
    try {
      const response = await lastValueFrom(
        this.client.send(RmqPatterns.SEND_MOCKUP_DATA, jsonData)
      );
      console.log('Mockup-Daten erfolgreich gesendet:', response);
    } catch (error) {
      console.error(' Fehler beim Senden der Mockup-Daten:', error.message);
    }
  }
}
