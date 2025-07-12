import { Component, Input, OnInit } from "@angular/core";
import L from "leaflet";
import { EventDTO } from '@kids-app/share';

/**
 * @file map.component.ts
 * @description Diese Komponente integriert eine interaktive Karte (Leaflet.js),
 * um Event-Standorte anzuzeigen. Sie kann entweder einen einzelnen Event-Standort
 * hervorheben oder mehrere Events auf der Karte darstellen.
 */

/**
 * @class MapComponent
 * @description Eine Angular Standalone-Komponente, die eine Leaflet-Karte initialisiert
 * und Event-Standorte darauf anzeigt.
 */
@Component({
    /**
     * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
     */
    standalone: true,
    /**
     * @property {string} selector - Der CSS-Selektor für diese Komponente.
     */
    selector: 'app-map-component',
    /**
     * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
     */
    templateUrl: './map.component.html',
    /**
     * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei.
     */
    styleUrl: './map.component.css',
    /**
     * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
     * (Hier leer, da Leaflet direkt im TypeScript-Code verwendet wird und keine Angular-Module benötigt).
     */
    imports: [],
  })
  export class MapComponent implements OnInit {

    /**
     * @property {L.Map} map - Die Instanz der Leaflet-Karte.
     */
    map!: L.Map;

    /**
     * @Input() event
     * @description Das EventDTO-Objekt, dessen Standort auf der Karte hervorgehoben werden soll.
     * Dieses Property ist optional und wird verwendet, wenn ein einzelnes Event angezeigt werden soll.
     * @type {EventDTO}
     */
    @Input() event!: EventDTO;

    /**
     * @Input() eventList
     * @description Eine Liste von EventDTO-Objekten, deren Standorte auf der Karte angezeigt werden sollen.
     * Dieses Property ist optional und wird verwendet, wenn mehrere Events angezeigt werden sollen.
     * @type {EventDTO[]}
     */
    @Input() eventList: EventDTO[] = [];

    /**
     * @method ngOnInit
     * @description Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
     * Initialisiert die Karte und zentriert sie auf den Standort des übergebenen Events.
     */
    ngOnInit(): void {
        this.initMap(); // Initialisiert die Leaflet-Karte.
        // Zentriert die Karte auf den Standort des Events und fügt einen Marker hinzu.
        this.zoomToEvent(this.event.location.lat, this.event.location.lng, 13);
    }

    /**
     * @method initMap
     * @description Initialisiert die Leaflet-Karte mit einem Standard-Kartenanbieter (OpenStreetMap)
     * und einer anfänglichen Ansicht.
     */
    initMap() {
        // Erstellt eine neue Leaflet-Karte und setzt die anfängliche Ansicht.
        this.map = L.map('map').setView([51.5361, 7.2006], 13);
        // Fügt eine OpenStreetMap-Kachelebene zur Karte hinzu.
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OppenStreetMap</a> contributors'}).addTo(this.map);
    }

    /**
     * @method zoomToMain
     * @description Setzt die Kartenansicht auf eine Standard-Zoomstufe und -Position zurück (Herne).
     */
    zoomToMain() {
      this.map.setView([51.5361, 7.2006], 6);
    }

    /**
     * @method zoomToEvent
     * @description Zentriert die Karte auf einen bestimmten geografischen Punkt und fügt einen Marker hinzu.
     * @param {number} lat - Der Breitengrad des Punktes.
     * @param {number} lng - Der Längengrad des Punktes.
     * @param {number | 13} zoom - Die Zoomstufe der Karte (Standard ist 13).
     */
    zoomToEvent(lat: number, lng: number, zoom: number | 13) {
      this.map.setView([lat, lng], zoom); // Setzt die Kartenansicht.
      // Fügt einen Marker an der angegebenen Position hinzu und bindet ein Popup mit dem Event-Titel.
      L.marker([lat, lng]).addTo(this.map).bindPopup(`<strong>${this.event.title}</strong>`)
      .openPopup(); // Öffnet das Popup sofort.
    }

    /**
     * @method zoomToEventList
     * @description Fügt Marker für alle Events in der `eventList` zur Karte hinzu.
     * Beachten Sie: Der Popup-Text verwendet hier `this.event.title`, was bei mehreren Markern
     * nicht korrekt ist. Es sollte `event.title` innerhalb der Schleife sein.
     * Dies ist ein potenzieller Bug, der behoben werden sollte.
     */
    zoomToEventList() {
      for (const event of this.eventList) {
        const lat = event.location.lat;
        const lng = event.location.lng;
        // Fügt einen Marker für jedes Event hinzu.
        // ACHTUNG: Der Popup-Text ist hier fix auf `this.event.title` gesetzt.
        // Er sollte `event.title` sein, um den Titel des jeweiligen Events anzuzeigen.
        L.marker([lat, lng]).addTo(this.map).bindPopup(`<strong>${event.title}</strong>`) // Korrigiert: event.title
        .openPopup();
      }
    }
  }
