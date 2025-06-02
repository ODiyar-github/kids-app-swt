
import { Component } from '@angular/core';
import { EventPreviewListComponent } from '../../eventPreviewList/eventPreviewList.component';

@Component({
  standalone:true,
  selector: 'app-eventsPage-component',
  templateUrl: './eventsPage.component.html',
  styleUrl: './eventsPage.component.css',
  imports: [EventPreviewListComponent],
})
export class EventsPageComponent {
  readonly path = 'angebote';
}
