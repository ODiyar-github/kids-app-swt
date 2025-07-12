/* eslint-disable @angular-eslint/prefer-inject */

import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { EventService } from '../../shared/services/event.service';
import { EventDTO, EventFeedBackDto, EventMockups, InterestEnum, Point, RatingEnum, WeatherForecast } from '@kids-app/share'
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { EventPreviewComponent } from "./eventPreview/eventPreview.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { SendDataService } from '../../shared/services/sendData.service';

/**
 * @file dashboard.component.ts
 * @description Diese Komponente repräsentiert das Haupt-Dashboard der Anwendung.
 * Sie ist verantwortlich für das Laden und Anzeigen einer Liste von Events,
 * typischerweise in einer Vorschau-Ansicht.
 */

/**
 * @class DashbardComponent
 * @description Eine Angular Standalone-Komponente, die das Dashboard der Anwendung darstellt.
 * Sie ruft Event-Daten über den `EventService` ab und zeigt sie an.
 */
@Component({
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-dashboard',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './dashboard.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei.
   */
  styleUrl: './dashboard.component.css',
  /**
   * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
   */
  imports: [
    CommonModule,        // Stellt allgemeine Direktiven wie ngIf und ngFor bereit.
    MatGridListModule,   // Bietet die MatGridList-Komponente für Raster-Layouts.
    MatListModule,       // Bietet die MatList-Komponente für Listen.
    MatCardModule,       // Bietet die MatCard-Komponente für Karten-basierte Layouts.
    HttpClientModule,    // Ermöglicht die Verwendung des HttpClient in dieser Komponente.
    EventPreviewComponent, // Importiert die EventPreviewComponent zur Anzeige einzelner Events.
    RouterLink           // Ermöglicht die Navigation über RouterLink-Direktiven im Template.
  ],
  /**
   * @property {Array<any>} providers - Dienste, die speziell für diese Komponente bereitgestellt werden.
   */
  providers: [
    EventService,    // Der EventService wird hier bereitgestellt, um Event-Daten abzurufen.
    SendDataService  // Der SendDataService wird hier bereitgestellt, um Initialisierungsdaten zu senden.
  ],
})
export class DashbardComponent {
  /**
   * @property {EventDTO[]} eventList - Ein Array, das die Liste der anzuzeigenden Events speichert.
   */
  eventList: EventDTO[] = [];

  /**
   * @property {typeof RoutingEnum} routingEnum - Eine Referenz auf das RoutingEnum für die Verwendung im Template.
   */
  routingEnum = RoutingEnum;

  /**
   * Erstellt eine Instanz von DashbardComponent.
   * @param {EventService} eventService - Der Dienst zum Abrufen von Event-Daten.
   * @param {ChangeDetectorRef} cdr - Der ChangeDetectorRef für die manuelle Änderungsdetektion.
   * @param {SendDataService} sendDataService - Der Dienst zum Senden von Initialisierungsdaten.
   * @param {Router} router - Der Angular Router für die Navigation (hier nicht direkt verwendet, aber injiziert).
   */
  constructor(
    private readonly eventService: EventService,
    private readonly cdr: ChangeDetectorRef,
    private readonly sendDataService: SendDataService,
    private readonly router: Router
  ){
    // Ruft die Methode zur Initialisierung der Datenquelle beim Erstellen der Komponente auf.
    this.initializeDataSource();
  }

  /**
   * @method initializeDataSource
   * @description Asynchrone Methode zur Initialisierung der Event-Datenquelle.
   * Sendet zunächst Initialisierungsdaten und ruft dann die Liste der Events vom `EventService` ab.
   * Aktualisiert die UI nach dem Laden der Daten.
   * @returns {Promise<void>} Ein Promise, das auflöst, wenn die Daten geladen und die UI aktualisiert wurden.
   */
  async initializeDataSource(): Promise<void> {
    // Sendet Initialisierungsdaten an das Backend.
    this.sendDataService.sendData();
    // Ruft die Event-Liste ab und wartet, bis das Observable abgeschlossen ist.
    this.eventList = await lastValueFrom(this.eventService.getEventList());
    // Erzwingt eine Änderungsdetektion, um die UI mit den neuen Daten zu aktualisieren.
    this.cdr.detectChanges();
  }
}
