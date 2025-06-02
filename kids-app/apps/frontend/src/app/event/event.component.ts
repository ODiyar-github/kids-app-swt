
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventDTO } from '../shared/dto/event.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-event-component',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  imports: [CommonModule, FormsModule, MatCardModule, MatDividerModule, MatIconModule, FlexLayoutModule],
})
export class EventComponent {
  @Input() data!: EventDTO;
}
