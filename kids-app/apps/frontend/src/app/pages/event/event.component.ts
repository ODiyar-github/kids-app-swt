import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component } from '@angular/core';
import { EventDTO } from '@kids-app/share'
import { EventPageEnum } from './enum/page.enum';
import { EventDetailsComponent } from "./eventDetails/eventDetails.component";
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  standalone: true,
  selector: 'app-event-component',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    FormsModule, 
    EventDetailsComponent,
    HttpClientModule
  ],
  providers: [
    EventService
  ],
})
export class EventComponent {
  eventPageEnum = EventPageEnum;
  event!: EventDTO;
  id$!: Observable<string>;
  constructor(private readonly route: ActivatedRoute,
    private readonly eventService: EventService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.id$ = this.route.params.pipe(map((params) => params['id']));
    this.id$.subscribe((id: string) => {
      this.eventService.getEventById(id).subscribe((event: EventDTO) => {
        if(event?.uuid){
          this.event = event;
        }
      });
    });
  }
}
