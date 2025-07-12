import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { FormsModule } from '@angular/forms';


/**
 * @file about.component.ts
 * @description Diese Komponente repräsentiert die "Über uns"-Seite der Anwendung.
 * Sie zeigt Informationen über die Anwendung, ihre Ziele oder das Team an,
 * oft in einem ausklappbaren (Accordion) Format.
 */

/**
 * @class AboutComponent
 * @description Eine Angular Standalone-Komponente, die die "Über uns"-Seite der Anwendung darstellt.
 * Sie verwendet Angular Material Komponenten wie `MatCard` und `MatExpansionModule`
 * für die Präsentation von Inhalten.
 */
@Component({
  /**
   * @property {string} selector - Der CSS-Selektor, der diese Komponente in HTML-Templates identifiziert.
   * Hier wird sie als `<app-about>` verwendet.
   */
  selector: 'app-about',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei dieser Komponente.
   * Definiert die Struktur und den Inhalt der "Über uns"-Seite.
   */
  templateUrl: './about.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei dieser Komponente.
   * Definiert das Styling für die "Über uns"-Seite.
   */
  styleUrl: './about.component.css',
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist
   * und keine NgModule benötigt.
   */
  standalone: true,
  /**
   * @property {Array<any>} imports - Ein Array von Modulen, Standalone-Komponenten, Direktiven oder Pipes,
   * die diese Komponente benötigt. Hier werden CommonModule, FormsModule und verschiedene Angular Material Module importiert.
   */
  imports: [
    CommonModule, // Stellt allgemeine Direktiven wie ngIf und ngFor bereit.
    FormsModule,  // Ermöglicht die Verwendung von Template-Driven Forms.
    MatCardModule, // Bietet die MatCard-Komponente für Karten-basierte Layouts.
    MatAccordion,  // Bietet die MatAccordion-Komponente für Akkordeon-Layouts.
    MatExpansionModule, // Bietet die MatExpansionPanel-Komponente für ausklappbare Bereiche.
  ],
})
export class AboutComponent {
  // Diese Komponente enthält derzeit keine spezifischen Eigenschaften oder Methoden,
  // da ihre Hauptaufgabe darin besteht, das statische "Über uns"-Inhalt anzuzeigen.
}
