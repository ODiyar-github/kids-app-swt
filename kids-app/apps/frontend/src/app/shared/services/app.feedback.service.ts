/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppFeedback } from "@kids-app/share";
import { environment } from "../../../environments/environment";

@Injectable()
export class FeedbackService {
  constructor(private readonly httpClient: HttpClient) {}

  public sendFeedBack(feedback: AppFeedback): Observable<AppFeedback> {
    return this.httpClient.post<AppFeedback>(`${environment.FEEDBACK.URL}`,feedback);
  }

  public getAllFeedbacks(): Observable<AppFeedback[]> {
    return this.httpClient.get<AppFeedback[]>(`${environment.EVENT.URL}`);
  }
}