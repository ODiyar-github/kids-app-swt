/* eslint-disable @angular-eslint/prefer-inject */
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { EventDTO, EventMockups, InterestEnum } from '@kids-app/share';
import { MapComponent } from './mapComponent/map.component';
import { EventService } from '../../../shared/services/event.service';
import { LoginService } from '../../../shared/services/login.service';
import { Observable } from 'rxjs';
import { UserDTO } from '@kids-app/share';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weaterComponent/weather.component';
import { RoutingEnum } from '../../../shared/enums/routing.enum';
import { EventPreviewComponent } from '../../dashboard/eventPreview/eventPreview.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  standalone: true,
  selector: 'app-event-details-component',
  templateUrl: './eventDetails.component.html',
  styleUrl: './eventDetails.component.css',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    MapComponent,
    CommonModule,
    HttpClientModule,
    WeatherComponent,
    EventPreviewComponent,
    RouterLink,
  ],
  providers: [EventService, LoginService],
})
export class EventDetailsComponent implements OnInit {
  routingEnum = RoutingEnum;
  eventMockups = EventMockups;
  recommendations: EventDTO[] = [];
  @Input() event!: EventDTO;
  user?: UserDTO;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {}
  ngOnInit(): void {
    this.getEventsByInterest(this.event.category, this.eventMockups);
    this.user = this.loginService.getCurrentUser();
  }

  logout(): void {
    this.loginService.logout();
  }

  login(){
    if (!this.user) {
      this.router.navigate(['/', this.routingEnum.LOGIN], {
        queryParams: { redirect: ['/', this.routingEnum.EVENT, this.event.uuid] },
      });
      return;
    }
  }

  addEventToUserList(){
    this.user?.bookedEventIds.push(this.event.uuid);
  }

  getEventsByInterest(interests: InterestEnum[], events: EventDTO[]) {
    if (!interests || interests.length === 0) {
      return;
    }

    const filteredEvents = events.filter((event) =>
      interests.some((interest) => event.category.includes(interest)),
    );

    this.recommendations = filteredEvents;
  }
}
