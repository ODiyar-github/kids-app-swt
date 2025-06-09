
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventDTO } from '@kids-app/share'
@Component({
  standalone: true,
  selector: 'app-event-preview',
  templateUrl: './eventPreview.component.html',
  styleUrl: './eventPreview.component.css',
  imports: [CommonModule, FormsModule, MatCardModule, MatDividerModule, MatIconModule],
})
export class EventPreviewComponent {
  @Input() data!: EventDTO;
}
