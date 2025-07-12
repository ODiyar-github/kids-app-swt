import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventDTO } from '@kids-app/share'

/**
 * @file eventPreview.component.ts
 * @description Diese Komponente dient zur Anzeige einer Vorschau eines Events.
 * Sie nimmt ein `EventDTO`-Objekt als Input entgegen und stellt dessen
 * grundlegende Informationen in einer kartenähnlichen Ansicht dar.
 */

/**
 * @class EventPreviewComponent
 * @description Eine Angular Standalone-Komponente, die eine kompakte Vorschau eines Events anzeigt.
 * Sie ist für die Wiederverwendung in Listen oder Übersichten von Events konzipiert.
 */
@Component({
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-event-preview',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './eventPreview.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei.
   */
  styleUrl: './eventPreview.component.css',
  /**
   * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
   */
  imports: [
    CommonModule,     // Stellt allgemeine Direktiven wie ngIf und ngFor bereit.
    FormsModule,      // Ermöglicht die Verwendung von Template-Driven Forms (falls benötigt).
    MatCardModule,    // Bietet die MatCard-Komponente für Karten-basierte Layouts.
    MatDividerModule, // Bietet die MatDivider-Komponente für Trennlinien.
    MatIconModule     // Bietet die MatIcon-Komponente für Material Icons.
  ],
})
export class EventPreviewComponent {
  /**
   * @Input() data
   * @description Das EventDTO-Objekt, das in dieser Vorschau angezeigt werden soll.
   * Dieses Property muss von der übergeordneten Komponente bereitgestellt werden.
   * Das `!` (definite assignment assertion) zeigt an, dass `data` zur Laufzeit
   * definitiv zugewiesen wird.
   * @type {EventDTO}
   */
  @Input() data!: EventDTO;

    /**
   * @method getTruncatedDescription
   * @description Kürzt die Event-Beschreibung auf maximal 100 Zeichen.
   * Wenn die Beschreibung länger ist, wird sie am letzten Leerzeichen vor dem 100. Zeichen
   * abgeschnitten und mit '...' ergänzt, um Wörter nicht zu zerteilen.
   * @returns {string} Die gekürzte oder vollständige Beschreibung.
   */
    getTruncatedDescription(): string {
      const maxLength = 100;
      if (!this.data || !this.data.description) {
        return ''; 
      }
  
      if (this.data.description.length <= maxLength) {
        return this.data.description; 
      }
  
      let truncated = this.data.description.substring(0, maxLength);
      const lastSpaceIndex = truncated.lastIndexOf(' ');

      if (lastSpaceIndex !== -1) {
        truncated = truncated.substring(0, lastSpaceIndex);
      }
  
      return truncated + '...';
    }
}
