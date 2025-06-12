import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { EventDTO } from '@kids-app/share'
import { EventPageEnum } from './enum/page.enum';
@Component({
  standalone: true,
  selector: 'app-event-component',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  imports: [    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    ],
})
export class EventComponent {
  @Input() event!: EventDTO;
  eventPageEnum = EventPageEnum;
}
