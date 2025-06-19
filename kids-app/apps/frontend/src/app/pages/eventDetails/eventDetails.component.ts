import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Component} from '@angular/core';
import { EventDTO } from '@kids-app/share'
import { ActivatedRoute } from '@angular/router';
import { EventMockups } from '@kids-app/share';
import { FlexLayoutModule } from '@angular/flex-layout';
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
    FormsModule,
    FlexLayoutModule,
    ],
})
export class EventDetailsComponent {

  event!: EventDTO;
  eventList = EventMockups;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('uuid'); // Get the ID from the URL
    this.event = this.eventList.find(obj => obj.uuid === uuid)!; // Find the object by ID
  }
}
