/* eslint-disable @angular-eslint/prefer-inject */
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

/**
 * @file event.component.ts
 * @description Diese Komponente ist für die Anzeige einer einzelnen Event-Seite zuständig.
 * Sie ruft die Event-Details basierend auf der ID in der URL ab und übergibt sie an die `EventDetailsComponent`.
 */

/**
 * @class EventComponent
 * @description Eine Angular Standalone-Komponente, die als Host für die `EventDetailsComponent` dient.
 * Sie extrahiert die Event-ID aus der URL und lädt die entsprechenden Event-Daten.
 */
@Component({
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-event-component',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './event.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei.
   */
  styleUrl: './event.component.css',
  /**
   * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
   */
  imports: [
    MatTableModule,        // Angular Material Modul für Tabellen.
    MatPaginatorModule,    // Angular Material Modul für Paginierung.
    MatInputModule,        // Angular Material Modul für Eingabefelder.
    MatIconModule,         // Angular Material Modul für Icons.
    MatSelectModule,       // Angular Material Modul für Dropdown-Auswahlen.
    MatCardModule,         // Angular Material Modul für Karten.
    MatDividerModule,      // Angular Material Modul für Trennlinien.
    FormsModule,           // Ermöglicht die Verwendung von Template-Driven Forms.
    EventDetailsComponent, // Importiert die EventDetailsComponent zur Anzeige der Event-Details.
    HttpClientModule       // Ermöglicht die Verwendung des HttpClient in dieser Komponente.
  ],
  /**
   * @property {Array<any>} providers - Dienste, die speziell für diese Komponente bereitgestellt werden.
   */
  providers: [
    EventService // Der EventService wird hier bereitgestellt.
  ],
})
export class EventComponent {
  /**
   * @property {typeof EventPageEnum} eventPageEnum - Eine Referenz auf das EventPageEnum für die Verwendung im Template.
   */
  eventPageEnum = EventPageEnum;

  /**
   * @property {EventDTO} event - Das EventDTO-Objekt, das die Details des aktuell angezeigten Events enthält.
   */
  event!: EventDTO;

  /**
   * @property {Observable<string>} id$ - Ein Observable, das die Event-ID aus den Routenparametern emittiert.
   */
  id$!: Observable<string>;

  /**
   * Erstellt eine Instanz von EventComponent.
   * @param {ActivatedRoute} route - Der ActivatedRoute-Dienst, um auf Routenparameter zuzugreifen.
   * @param {EventService} eventService - Der Dienst zum Abrufen von Event-Daten.
   * @param {ChangeDetectorRef} cdr - Der ChangeDetectorRef für die manuelle Änderungsdetektion.
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventService: EventService,
    private readonly cdr: ChangeDetectorRef
  ) {
    // Extrahiert die 'id' aus den Routenparametern und speichert sie in id$.
    this.id$ = this.route.params.pipe(map((params) => params['id']));

    // Abonniert id$, um die Event-Details abzurufen, sobald die ID verfügbar ist.
    this.id$.subscribe((id: string) => {
      this.eventService.getEventById(id).subscribe((event: EventDTO) => {
        // Wenn ein Event mit der UUID gefunden wurde, wird es der `event`-Eigenschaft zugewiesen.
        if (event?.uuid) {
          this.event = event;
        }
      });
    });
  }
}
