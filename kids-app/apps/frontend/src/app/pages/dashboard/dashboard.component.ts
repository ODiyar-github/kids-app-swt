/* eslint-disable @angular-eslint/prefer-inject */

import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { EventService } from '../../shared/services/event.service';
import { Appointment, EventDTO, EventFeedBackDto, EventMockups, InterestEnum, Point, RatingEnum, WeatherForecast } from '@kids-app/share'
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { EventPreviewComponent } from "./eventPreview/eventPreview.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { SendDataService } from '../../shared/services/sendData.service';
@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    CommonModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    EventPreviewComponent,
    RouterLink
],
  providers: [
    EventService,
    SendDataService
  ],
})
export class DashbardComponent {
  eventList: EventDTO[] = [];
  routingEnum = RoutingEnum;
  testValue = '';
  constructor(
    private readonly eventService: EventService, 
    private readonly cdr: ChangeDetectorRef, 
    private readonly sendDataService: SendDataService,
    private readonly router: Router
  ){
    // this.initializeDataSource();
    this.eventList = EventMockups;
  }

  // async initializeDataSource(): Promise<void> {
  //   this.sendDataService.sendData();
  //   this.eventList = await lastValueFrom(this.eventService.getEventList());
  //   this.cdr.detectChanges();
  // }  

}
