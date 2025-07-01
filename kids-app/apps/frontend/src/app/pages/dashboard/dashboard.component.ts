/* eslint-disable @angular-eslint/prefer-inject */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { EventService } from '../../shared/services/event.service';
import { EventDTO } from '@kids-app/share'
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { EventPreviewComponent } from "./eventPreview/eventPreview.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { TestService } from '../../shared/services/test.service';
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
    TestService
  ],
})
export class DashbardComponent {
  eventList: EventDTO[] = [];
  routingEnum = RoutingEnum;
  testValue = '';
  constructor(
    private readonly eventService: EventService, 
    private readonly cdr: ChangeDetectorRef, 
    private readonly testService: TestService,
    private router: Router){
    this.initializeDataSource();
  }

  async initializeDataSource(): Promise<void> {
    this.eventList = await lastValueFrom(this.eventService.getEventList());
    this.testValue = await lastValueFrom(this.testService.testSend());
    this.cdr.detectChanges();
  }  

  async testSend(){
    this.testValue = JSON.stringify(await lastValueFrom(this.testService.testSend()));
    this.cdr.detectChanges();
  }
}
