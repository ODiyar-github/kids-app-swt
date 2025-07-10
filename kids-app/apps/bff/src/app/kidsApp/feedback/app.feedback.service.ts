import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AmqpBrokerQueues, RmqPatterns } from "@libs/amqp/amqp";
import { AppFeedback } from "@kids-app/share";
import { Observable } from "rxjs";

@Injectable()
export class AppFeedbackService {
  constructor(
    @Inject(AmqpBrokerQueues.KIDS_APP_STORAGE_SERVICE_QUEUE)
    private readonly client: ClientProxy
  ) {}

  getAllFeedbacks(): Observable<AppFeedback[]> {
    console.log('📨 Fordere alle Appfeedbacks vom Backend an');
    return this.client.send(RmqPatterns.FEEDBACK.GET_ALL_FEEDBACKS, {});
  }

  createFeedback(newFeedback: AppFeedback): Observable<AppFeedback> {
    return this.client.send(RmqPatterns.FEEDBACK.POST_FEEDBACK, { newFeedback });
  }
}

