
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { EventService } from '../../shared/services/event.service';
import { EventDTO } from '@kids-app/share'
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { EventPreviewComponent } from "./eventPreview/eventPreview.component";
import { CommonModule } from '@angular/common';
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
    EventPreviewComponent
],
  providers: [
    EventService
  ],
})
export class DashbardComponent {
  eventList: EventDTO[] = [];
  constructor(private readonly eventService: EventService, private readonly cdr: ChangeDetectorRef){
    this.initializeDataSource();
  }

  async initializeDataSource(): Promise<void> {
    this.eventList = await lastValueFrom(this.eventService.getEventList());
    this.cdr.detectChanges();
  }  
}
