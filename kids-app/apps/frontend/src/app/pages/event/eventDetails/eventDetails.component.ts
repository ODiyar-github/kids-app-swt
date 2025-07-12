/* eslint-disable @angular-eslint/prefer-inject */
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { EventDTO, EventMockups, InterestEnum, Logs } from '@kids-app/share';
import { MapComponent } from './mapComponent/map.component';
import { EventService } from '../../../shared/services/event.service';
import { LoginService } from '../../../shared/services/login.service';
import { lastValueFrom, map, Observable, of } from 'rxjs';
import { UserDTO } from '@kids-app/share';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weaterComponent/weather.component';
import { RoutingEnum } from '../../../shared/enums/routing.enum';
import { EventPreviewComponent } from '../../dashboard/eventPreview/eventPreview.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

/**
 * @file eventDetails.component.ts
 * @description Diese Komponente zeigt die detaillierten Informationen eines einzelnen Events an.
 * Sie umfasst Event-Details, eine Karte mit dem Event-Standort, Wettervorhersagen und
 * empfohlene Events basierend auf Interessen. Benutzer können sich für Events anmelden.
 */

/**
 * @class EventDetailsComponent
 * @description Eine Angular Standalone-Komponente, die die Detailansicht eines Events darstellt.
 * Sie interagiert mit `LoginService` und `EventService`, um Benutzer- und Event-Daten zu verwalten.
 */
@Component({
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-event-details-component',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './eventDetails.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei.
   */
  styleUrl: './eventDetails.component.css',
  /**
   * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
   */
  imports: [
    CommonModule,          // Stellt allgemeine Direktiven wie ngIf und ngFor bereit.
    HttpClientModule,      // Ermöglicht die Verwendung des HttpClient in dieser Komponente.
    FormsModule,           // Ermöglicht die Verwendung von Template-Driven Forms.
    RouterLink,            // Ermöglicht die Navigation über RouterLink-Direktiven im Template.
    MapComponent,          // Importiert die MapComponent zur Anzeige des Event-Standorts.
    WeatherComponent,      // Importiert die WeatherComponent zur Anzeige der Wettervorhersage.
    EventPreviewComponent, // Importiert die EventPreviewComponent zur Anzeige von Empfehlungen.
    MatTableModule,        // Angular Material Modul für Tabellen.
    MatPaginatorModule,    // Angular Material Modul für Paginierung.
    MatInputModule,        // Angular Material Modul für Eingabefelder.
    MatIconModule,         // Angular Material Modul für Icons.
    MatSelectModule,       // Angular Material Modul für Dropdown-Auswahlen.
    MatCardModule,         // Angular Material Modul für Karten.
    MatDividerModule,      // Angular Material Modul für Trennlinien.
    MatButtonModule,       // Angular Material Modul für Buttons.
  ],
  /**
   * @property {Array<any>} providers - Dienste, die speziell für diese Komponente bereitgestellt werden.
   */
  providers: [EventService], // Der EventService wird hier bereitgestellt.
})
export class EventDetailsComponent implements OnInit {
  /**
   * @property {typeof RoutingEnum} routingEnum - Eine Referenz auf das RoutingEnum für die Verwendung im Template.
   */
  routingEnum = RoutingEnum;

  /**
   * @Input() event
   * @description Das EventDTO-Objekt, dessen Details in dieser Komponente angezeigt werden.
   * Dieses Property muss von der übergeordneten Komponente bereitgestellt werden.
   * @type {EventDTO}
   */
  @Input() event!: EventDTO;

  /**
   * @property {Observable<UserDTO | undefined> | undefined} user$ - Ein Observable, das den aktuellen Benutzerstatus emittiert.
   */
  user$: Observable<UserDTO | undefined> | undefined;

  /**
   * @property {Observable<EventDTO[]>} recommendations$ - Ein Observable, das eine Liste von empfohlenen Events emittiert.
   */
  recommendations$!: Observable<EventDTO[]>;

  /**
   * Erstellt eine Instanz von EventDetailsComponent.
   * @param {LoginService} loginService - Der Dienst für Benutzerauthentifizierung und -verwaltung.
   * @param {EventService} eventService - Der Dienst für Event-bezogene Operationen.
   * @param {Router} router - Der Angular Router für die Navigation.
   * @param {ChangeDetectorRef} cdr - Der ChangeDetectorRef für die manuelle Änderungsdetektion.
   */
  constructor(
    private readonly loginService: LoginService,
    private readonly eventService: EventService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Initialisiert den `user$`-Observable und generiert Event-Empfehlungen.
   */
  ngOnInit(): void {
    this.user$ = this.loginService.currentUser$; // Abonniert den aktuellen Benutzerstatus.
    console.log(this.user$); // Loggt den Benutzer-Observable zur Debugging-Zwecken.

    // Ruft alle Events ab und filtert sie, um Empfehlungen basierend auf den Interessen des aktuellen Events zu generieren.
    this.recommendations$ = this.eventService.getEventList().pipe(
      map((eventList) => {
        return this.getEventsByInterest(this.event.category, eventList);
      })
    );

    this.cdr.detectChanges(); // Erzwingt eine Aktualisierung der UI.
  }

  /**
   * @method login
   * @description Leitet den Benutzer zur Login-Seite um, mit einem Redirect-Parameter,
   * der nach erfolgreicher Anmeldung zurück zur aktuellen Event-Detailseite führt.
   */
  login(): void {
    this.router.navigate(['/', this.routingEnum.LOGIN], {
      queryParams: { redirect: `/${this.routingEnum.EVENT}/${this.event.uuid}` },
    });
  }

  /**
   * @method addEventToUserList
   * @description Fügt das aktuelle Event zur Liste der gebuchten Events des Benutzers hinzu
   * und erstellt einen entsprechenden Log-Eintrag. Aktualisiert dann die Benutzerdaten im Backend.
   * @param {UserDTO} user - Das UserDTO-Objekt des aktuell angemeldeten Benutzers.
   */
  addEventToUserList(user: UserDTO): void {
    // Prüft, ob das Event bereits gebucht wurde, um Duplikate zu vermeiden.
    if(user.bookedEventIds.includes(this.event.uuid)){
      return;
    }
    user.bookedEventIds.push(this.event.uuid); // Fügt die Event-UUID zur Liste der gebuchten Events hinzu.
    // Erstellt einen neuen Log-Eintrag für die Teilnahme am Event.
    user.logs.push(new Logs(user.firstName + ' ' + user.lastName, new Date().toISOString(), this.event.uuid, 'Teilnahme am '+this.event.title));
    this.loginService.updateCurrentUser(); // Aktualisiert die Benutzerdaten im Backend.
    this.cdr.detectChanges(); // Erzwingt eine Aktualisierung der UI.
  }

  /**
   * @private
   * @method getEventsByInterest
   * @description Filtert eine Liste von Events, um diejenigen zurückzugeben, die gemeinsame Interessen
   * mit den angegebenen Interessen haben und nicht das aktuelle Event selbst sind.
   * @param {InterestEnum[]} interests - Eine Liste von Interessen zum Filtern.
   * @param {EventDTO[]} events - Die vollständige Liste der Events, die gefiltert werden sollen.
   * @returns {EventDTO[]} Ein Array von EventDTOs, die den Filterkriterien entsprechen.
   */
  private getEventsByInterest(interests: InterestEnum[], events: EventDTO[]): EventDTO[] {
    // Gibt ein leeres Array zurück, wenn keine Interessen zum Filtern vorhanden sind.
    if (!interests || interests.length === 0) return [];

    // Filtert die Events: Ein Event wird eingeschlossen, wenn es mindestens ein gemeinsames Interesse hat
    // und nicht das Event ist, dessen Details gerade angezeigt werden.
    return events.filter(
      (event) => interests.some((i) => event.category.includes(i)) && event.uuid !== this.event.uuid
    );
  }
}
