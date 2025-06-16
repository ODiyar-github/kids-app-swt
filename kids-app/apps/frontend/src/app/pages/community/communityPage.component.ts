
import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../shared/services/community.service';
import { LoginService } from '../../shared/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {EventDTO} from '@kids-app/share'
import { EventPreviewComponent } from '../dashboard/eventPreview/eventPreview.component';
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
    EventPreviewComponent
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
      this.eventList = [new EventDTO(
        "1", 
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        "",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "Max Musterstr. 3, 12345 Musterstadt",
        "15. Mai",
        "12:30 bis 15:00",
        "11 bis 14 Jahre",
        ""
      ),
      new EventDTO(
        "2",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        "test",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "Eva Evastr. 6, 54321 Evastadt",
        "21. Juni",
        "15:30 bis 20:00",
        "12 bis 16 Jahre",
        ""
      ),
      new EventDTO(
        "3",
        "Graffiti-Workshop",
        "",
        "Lerne coole Techniken mit Sprühdosen – ideal für Anfänger und Fortgeschrittene.",
        "Jugendzentrum Westend, Herne",
        "05. Juli",
        "10:00 bis 14:00",
        "14 bis 18 Jahre",
        ""
      ),
      new EventDTO(
        "4",
        "Coding für Einsteiger",
        "",
        "Du wolltest schon immer Programmieren lernen? Hier fangen wir gemeinsam mit HTML, CSS & JavaScript an.",
        "Stadtbibliothek Herne",
        "12. Juli",
        "09:30 bis 12:30",
        "13 bis 17 Jahre",
        ""
      ),
      new EventDTO(
        "5",
        "Skatepark Jam",
        "",
        "Skateboard-Contest mit DJ, Foodtruck und kleinen Preisen für die besten Tricks.",
        "Skatepark Herne Mitte",
        "20. Juli",
        "13:00 bis 17:00",
        "12 bis 18 Jahre",
        ""
      ),
      new EventDTO(
        "6",
        "Brettspielnachmittag",
        "",
        "Bring deine Freunde mit und entdecke neue Brettspiele in entspannter Atmosphäre.",
        "Kulturzentrum Herne",
        "28. Juli",
        "15:00 bis 18:00",
        "10 bis 16 Jahre",
        ""
      ),
      new EventDTO(
        "7",
        "Sommerkino Open-Air",
        "",
        "Genieße einen Kinoabend unter freiem Himmel mit Popcorn und guter Laune.",
        "Schlosspark Strünkede",
        "01. August",
        "20:30 bis 23:00",
        "ab 12 Jahre",
        ""
      )]
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
