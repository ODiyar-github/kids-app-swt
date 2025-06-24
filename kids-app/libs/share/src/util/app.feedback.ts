import { AppFeedbackEnum } from "./enums/app.feedback.enum";

export class AppFeedback {
    name: string;
    email?: string;
    type: AppFeedbackEnum;
    message: string;
    timestamp: Date;
  
    constructor(
      name: string,
      type: AppFeedbackEnum,
      message: string,
      email?: string
    ) {
      this.name = name;
      this.type = type;
      this.message = message;
      this.email = email;
      this.timestamp = new Date();
    }
  }