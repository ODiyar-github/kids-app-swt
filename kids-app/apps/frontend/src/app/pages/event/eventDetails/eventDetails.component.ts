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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { EventDTO, EventMockups, InterestEnum, Logs } from '@kids-app/share';
import { MapComponent } from './mapComponent/map.component';
import { EventService } from '../../../shared/services/event.service';
import { LoginService } from '../../../shared/services/login.service';
import { lastValueFrom, map, Observable, of } from 'rxjs';
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
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
    MapComponent,
    WeatherComponent,
    EventPreviewComponent,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
  ],
  providers: [EventService],
})
export class EventDetailsComponent implements OnInit {
  routingEnum = RoutingEnum;

  @Input() event!: EventDTO;

  user$: Observable<UserDTO | undefined> | undefined;
  recommendations$!: Observable<EventDTO[]>;

  constructor(
    private readonly loginService: LoginService,
    private readonly eventService: EventService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user$ = this.loginService.currentUser$;;
    console.log(this.user$);
    this.recommendations$ = this.eventService.getEventList().pipe(
      map((eventList) => {
        return this.getEventsByInterest(this.event.category, eventList);
      })
    );


    this.cdr.detectChanges();
  }

  login(): void {
    this.router.navigate(['/', this.routingEnum.LOGIN], {
      queryParams: { redirect: `/${this.routingEnum.EVENT}/${this.event.uuid}` },
    });
  }

  addEventToUserList(user: UserDTO): void {
    if(user.bookedEventIds.includes(this.event.uuid)){
      return;
    }
    user.bookedEventIds.push(this.event.uuid);
    user.logs.push(new Logs(user.firstName + ' ' + user.lastName, new Date().toISOString(), this.event.uuid, 'Teilnahme am '+this.event.title));
    this.loginService.updateCurrentUser();
    this.loginService.test();
    this.cdr.detectChanges();
  }

  private getEventsByInterest(interests: InterestEnum[], events: EventDTO[]): EventDTO[] {
    if (!interests || interests.length === 0) return [];

    return events.filter(
      (event) => interests.some((i) => event.category.includes(i)) && event.uuid !== this.event.uuid
    );
  }
}