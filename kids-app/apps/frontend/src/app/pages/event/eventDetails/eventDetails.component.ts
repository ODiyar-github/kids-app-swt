import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Component, Input} from '@angular/core';
import { EventDTO } from '@kids-app/share'
import { MapComponent } from "./mapComponent/map.component";
import { EventService } from '../../../shared/services/event.service';
import { HttpClientModule } from '@angular/common/http';
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
    MapComponent,
    HttpClientModule,
],
providers: [EventService]
})
export class EventDetailsComponent {
  @Input() event!: EventDTO;
}
