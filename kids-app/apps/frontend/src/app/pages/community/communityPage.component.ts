
import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../shared/services/community.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {EventDTO, EventMockups} from '@kids-app/share'
import { EventPreviewComponent } from '../dashboard/eventPreview/eventPreview.component';
import { MapComponent } from "../event/mapComponent/map.component";
interface ActivityDTO {
  friendId: string;
  friendName: string;
  action: 'JOINED_EVENT' | 'LEFT_EVENT' | 'CREATED_EVENT';
  eventId: string;
  eventName: string;
  timestamp: string;
}
interface FriendActivities {
  friendId: string;
  friendName: string;
  events: {
    event: EventDTO;
    action: 'JOINED_EVENT' | 'LEFT_EVENT' | 'CREATED_EVENT';
    timestamp: string;
  }[];
}
@Component({
  standalone:true,
  selector: 'app-community-component',
  templateUrl: './communityPage.component.html',
  styleUrl: './communityPage.component.css',
  imports: [
    HttpClientModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule,
    EventPreviewComponent,
],
  providers: [
    CommunityService
  ],
})
export class CommunityComponent implements OnInit {
  activities: ActivityDTO[] = [];
  eventList: EventDTO[] = [];
  friendActivitiesList: FriendActivities[] = [];
  isLoading = true;

  ngOnInit(): void {
    // Simuliere Laden von Freundesaktivitäten & User-Events
    setTimeout(() => {
      // Freundesaktivitäten (wie zuvor)
      this.activities = [
        {
          friendId: 'u123',
          friendName: 'Anna Müller',
          action: 'JOINED_EVENT',
          eventId: 'e789',
          eventName: 'Grillfest im Park',
          timestamp: '2025-06-15T13:45:00Z'
        },
        {
          friendId: 'u456',
          friendName: 'Max Schulz',
          action: 'CREATED_EVENT',
          eventId: 'e456',
          eventName: 'Coding Workshop',
          timestamp: '2025-06-14T09:30:00Z'
        }
      ];
      this.eventList = EventMockups
      // Gruppieren nach Freund
      const grouped = new Map<string, FriendActivities>();

      this.activities.forEach(act => {
        let fa = grouped.get(act.friendId);
        if (!fa) {
          fa = {
            friendId: act.friendId,
            friendName: act.friendName,
            events: []
          };
          grouped.set(act.friendId, fa);
        }
        const eventData = this.eventList.find(e => e.uuid === act.eventId);
        if(eventData) {
          fa.events.push({
            event: eventData,
            action: act.action,
            timestamp: act.timestamp
          });
        }
      });

      this.friendActivitiesList = Array.from(grouped.values());

      this.isLoading = false;
    }, 1000);
  }
}
