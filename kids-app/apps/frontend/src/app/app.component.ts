import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './layout/toolbar.component';

/**
 * @file app.component.ts
 * @description Dies ist die Hauptkomponente (Root Component) der Angular-Anwendung.
 * Sie dient als Container für die gesamte Anwendung und definiert das grundlegende Layout,
 * einschließlich des Routers und der Toolbar.
 */

/**
 * @class AppComponent
 * @description Die Root-Komponente der Angular-Anwendung.
 * Als Standalone-Komponente ist sie selbstständig und kann direkt gebootstrappt werden.
 * Sie integriert den Angular Router und die Toolbar-Komponente.
 */
@Component({
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist
   * und keine NgModule benötigt.
   */
  standalone: true,
  /**
   * @property {string} selector - Der CSS-Selektor, der diese Komponente in HTML-Templates identifiziert.
   * Hier wird sie als `<app-root>` verwendet.
   */
  selector: 'app-root',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei dieser Komponente.
   * Definiert die Struktur und den Inhalt der Komponente.
   */
  templateUrl: './app.component.html',
  /**
   * @property {Array<any>} imports - Ein Array von Standalone-Komponenten, Direktiven oder Pipes,
   * die diese Komponente benötigt. Hier werden RouterModule für das Routing und ToolbarComponent
   * für die obere Navigationsleiste importiert.
   */
  imports: [ RouterModule, ToolbarComponent],
})
export class AppComponent {
  // Diese Root-Komponente enthält derzeit keine spezifischen Eigenschaften oder Methoden,
  // da ihre Hauptaufgabe darin besteht, andere Komponenten über das Template zu rendern.
}
