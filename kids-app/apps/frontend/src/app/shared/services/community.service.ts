import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivityDTO } from '@kids-app/share'
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
  export class CommunityService {
    constructor(private http: HttpClient) {}
  
    getFriendActivities(userId: string): Observable<ActivityDTO[]> {
      return this.http.get<ActivityDTO[]>(`${environment.USER.URL}/friends/${userId}/activities`);
    }
  }