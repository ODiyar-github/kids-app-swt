
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { EventDTO } from '../../../shared/dto/event.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-eventPreview-component',
  templateUrl: './eventPreview.component.html',
  styleUrl: './eventPreview.component.css',
  imports: [CommonModule, FormsModule, MatCardModule, MatDividerModule, MatIconModule],
})
export class EventPreviewComponent {
  @Input() data!: EventDTO;
}
