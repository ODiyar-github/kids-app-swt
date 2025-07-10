import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppFeedback } from "@kids-app/share";
import { Observable } from "rxjs";
import { AppFeedbackService } from "./app.feedback.service";

@ApiTags('feedback')
@Controller('feedback')
export class AppFeedbackController {
  constructor(private readonly feedbackService: AppFeedbackService) {}

  @Get()
  @ApiOperation({ summary: 'Alle Appfeedbacks abrufen' })
  @ApiResponse({ status: 200, description: 'Liste aller Appfeedbacks', type: [AppFeedback] })
  getAllEvents(): Observable<AppFeedback[]> {
    console.log('📥 Anfrage: Alle Appfeedbacks');
    return this.feedbackService.getAllFeedbacks();
  }

  @Post()
  @ApiOperation({ summary: 'Ein Feedback wird erstellt' })
  @ApiResponse({ status: 200, description: 'Einzelnes appfeedback', type: AppFeedback })
  getEventById(@Param('appFeedback') appFeedback: AppFeedback): Observable<AppFeedback> {
    console.log(`📥 Anfrage: Create a feedback ${appFeedback}`);
    return this.feedbackService.createFeedback(appFeedback);
  }
}