import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { WeatherForecast } from '@kids-app/share';

/**
 * @file weather.component.ts
 * @description Diese Komponente zeigt Wettervorhersagen an.
 * Sie nimmt ein Array von `WeatherForecast`-Objekten als Input entgegen
 * und kann eine aktuelle Wettervorhersage sowie eine Liste zukünftiger Vorhersagen darstellen.
 */

/**
 * @class WeatherComponent
 * @description Eine Angular Standalone-Komponente, die Wettervorhersagedaten visuell aufbereitet.
 */
@Component({
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-weather',
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './weather.component.html',
  /**
   * @property {string[]} styleUrls - Die Pfade zu den CSS-Stylesheet-Dateien.
   */
  styleUrls: ['./weather.component.css'],
  /**
   * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
   */
  imports: [
    MatCardModule,  // Bietet die MatCard-Komponente für Karten-basierte Layouts.
    MatIconModule,  // Bietet die MatIcon-Komponente für Material Icons (z.B. Wetter-Icons).
    MatListModule,  // Bietet die MatList-Komponente für Listen.
    CommonModule    // Stellt allgemeine Direktiven wie ngIf und ngFor bereit.
  ],
})
export class WeatherComponent {
  /**
   * @Input() weatherForecast
   * @description Ein Array von `WeatherForecast`-Objekten, das die Wettervorhersagen enthält.
   * Dieses Property wird von der übergeordneten Komponente bereitgestellt.
   * @type {WeatherForecast[]}
   */
  @Input() weatherForecast!: WeatherForecast[];

  /**
   * @property {WeatherForecast} currentWeath - Ein `WeatherForecast`-Objekt, das eine Standard-Wettervorhersage für "Heute" repräsentiert.
   * Dies könnte als Fallback oder Initialwert dienen.
   */
  currentWeath!: WeatherForecast;

  /**
   * Erstellt eine Instanz von WeatherComponent.
   * Initialisiert `currentWeath` mit Standardwerten.
   */
  constructor(){
    this.currentWeath = new WeatherForecast('Today', 'wb_sunny', 22, 28);
  }
}