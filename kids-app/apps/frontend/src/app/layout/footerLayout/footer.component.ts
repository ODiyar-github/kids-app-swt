import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * @file footer.component.ts
 * @description Diese Komponente repräsentiert den Footer (Fußzeile) der Anwendung.
 * Sie enthält typischerweise Copyright-Informationen, Links zu sozialen Medien oder andere statische Inhalte.
 */

/**
 * @class FooterComponent
 * @description Eine Angular Standalone-Komponente, die die Fußzeile der Anwendung darstellt.
 * Sie ist für die Anzeige von statischen Informationen am unteren Rand der Seite konzipiert.
 */
@Component({
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
   */
  imports: [
    CommonModule,  // Stellt allgemeine Direktiven wie ngIf und ngFor bereit.
    MatIconModule  // Angular Material Modul für Icons (z.B. für Social Media Links).
  ],
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-footer',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './footer.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei.
   */
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // Diese Komponente enthält derzeit keine spezifischen Eigenschaften oder Methoden,
  // da ihre Hauptaufgabe darin besteht, statischen Inhalt anzuzeigen.
}
