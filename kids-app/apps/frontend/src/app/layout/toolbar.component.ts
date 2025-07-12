/* eslint-disable @angular-eslint/prefer-inject */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { RoutingEnum } from '../shared/enums/routing.enum';
import { FooterComponent } from "./footerLayout/footer.component";
import { LoginService } from '../shared/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '@kids-app/share';

/**
 * @file toolbar.component.ts
 * @description Diese Komponente repräsentiert die obere Navigationsleiste (Toolbar) der Anwendung.
 * Sie enthält Navigationslinks, ein Hamburger-Menü für mobile Ansichten und zeigt den Anmeldestatus des Benutzers an.
 */

/**
 * @class ToolbarComponent
 * @description Eine Angular Standalone-Komponente, die die globale Toolbar der Anwendung darstellt.
 * Sie bietet Navigationsmöglichkeiten und interagiert mit dem `LoginService`, um den Anmeldestatus zu verwalten.
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
    CommonModule,         // Stellt allgemeine Direktiven wie ngIf und ngFor bereit.
    MatToolbarModule,     // Angular Material Modul für die Toolbar.
    MatMenuModule,        // Angular Material Modul für Menüs.
    MatListModule,        // Angular Material Modul für Listen (oft in Sidebars verwendet).
    MatButtonModule,      // Angular Material Modul für Buttons.
    MatIconModule,        // Angular Material Modul für Icons.
    RouterLink,           // Ermöglicht die Navigation über RouterLink-Direktiven.
    RouterLinkActive,     // Fügt eine CSS-Klasse hinzu, wenn der Link aktiv ist.
    MatSidenavModule,     // Angular Material Modul für Side-Navigation.
    MatSidenavContainer,  // Container für Sidenav und Content.
    MatSidenavContent,    // Bereich für den Hauptinhalt neben der Sidenav.
    FooterComponent,      // Importiert die FooterComponent.
    HttpClientModule,     // Ermöglicht die Verwendung des HttpClient in dieser Komponente.
  ],
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-toolbar',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './toolbar.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei.
   */
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  /**
   * @protected
   * @property {typeof RoutingEnum} RoutingEnum - Eine Referenz auf das RoutingEnum für die Verwendung im Template.
   */
  protected readonly RoutingEnum = RoutingEnum;

  /**
   * @property {Observable<UserDTO | undefined>} user$ - Ein Observable, das den aktuellen Benutzerstatus emittiert.
   * Wird vom `LoginService` bereitgestellt.
   */
  user$: Observable<UserDTO | undefined>;

  /**
   * Erstellt eine Instanz von ToolbarComponent.
   * @param {LoginService} loginService - Der Dienst für Benutzerauthentifizierung und -verwaltung.
   * Dieser Dienst ist `public`, um direkten Zugriff im Template zu ermöglichen.
   */
  constructor(public readonly loginService: LoginService) {
    this.user$ = this.loginService.currentUser$; // Abonniert den aktuellen Benutzerstatus.
  }

  /**
   * @method logout
   * @description Meldet den aktuell angemeldeten Benutzer ab.
   * Ruft die `logout`-Methode des `LoginService` auf.
   */
  logout(): void {
    this.loginService.logout();
  }
}
