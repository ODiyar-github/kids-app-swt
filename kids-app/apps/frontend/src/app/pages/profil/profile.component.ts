/* eslint-disable @angular-eslint/prefer-inject */
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserDTO, InterestEnum } from '@kids-app/share';
import { LoginService } from '../../shared/services/login.service';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { EventService } from '../../shared/services/event.service';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [EventService],
})
export class ProfilePageComponent implements OnInit {
  routingEnum = RoutingEnum;
  user$: Observable<UserDTO | undefined>;
  editableUser: UserDTO | null = null;
  isLoading = true;
  interests = Object.values(InterestEnum);

  friendNames: string[] = [];
  eventHistoryTitles: string[] = [];
  bookedEventTitles: string[] = [];
  eventDatesMap: { [title: string]: string } = {};
  constructor(
    private readonly loginService: LoginService,
    private readonly eventService: EventService,
    private readonly router: Router,
  ) {
    this.user$ = this.loginService.currentUser$;
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/', this.routingEnum.LOGIN]);
        return;
      }


      // Freunde laden
      this.friendNames = [];
      user.friendIds.forEach((friendId) => {
        this.loginService.getUserInformation(friendId).subscribe((friend) => {
          const fullName = `${friend.firstName} ${friend.lastName}`;
          if (!this.friendNames.includes(fullName)) {
            this.friendNames.push(fullName);
          }
        });
      });

      // Event-Historie laden
      this.eventHistoryTitles = [];
      user.eventHistoryIds.forEach((eventId) => {
        this.eventService.getEventById(eventId).subscribe((event) => {
          if (event?.title && !this.eventHistoryTitles.includes(event.title)) {
            this.eventHistoryTitles.push(event.title);
          }
        });
      });

      // Gebuchte Events laden
      this.bookedEventTitles = [];
      user.bookedEventIds.forEach((eventId) => {
        this.eventService.getEventById(eventId).subscribe((event) => {
          if (event?.title) {
            const readableDate = new Date(event.date).toLocaleString('de-DE', {
              dateStyle: 'short',
              timeStyle: 'short',
            });
            this.bookedEventTitles.push(event.title);
            this.eventDatesMap[event.title] = readableDate;
          }
        });
      });

      this.isLoading = false;
    });
  }

  saveChanges(): void {
    console.log('DIE USER DATEN:', this.loginService.getCurrentUser());
    this.loginService.updateCurrentUser()
  }

  removeFriend(friendName: string): void {
    this.user$.subscribe((user) => {
      if (!user) return;
  
      const friendIdToRemove = user.friendIds.find((id) =>
        this.loginService.getUserInformation(id).subscribe((friend) => {
          const fullName = `${friend.firstName} ${friend.lastName}`;
          if (fullName === friendName) {
            user.friendIds = user.friendIds.filter((fid) => fid !== id);
            this.loginService.updateCurrentUser().subscribe(() => {
              this.friendNames = this.friendNames.filter((f) => f !== friendName);
            });
          }
        })
      );
    });
  }

  removeBookedEvent(eventTitle: string): void {
    this.user$.subscribe((user) => {
      if (!user) return;
  
      const eventIdToRemove = user.bookedEventIds.find((eventId) => {
        return this.eventService.getEventById(eventId).subscribe((event) => {
          if (event.title === eventTitle) {
            user.bookedEventIds = user.bookedEventIds.filter((eid) => eid !== eventId);
            this.loginService.updateCurrentUser().subscribe(() => {
              this.bookedEventTitles = this.bookedEventTitles.filter((e) => e !== eventTitle);
            });
          }
        });
      });
    });
  }


}

