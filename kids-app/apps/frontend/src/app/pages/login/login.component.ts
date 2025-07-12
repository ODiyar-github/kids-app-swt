/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../shared/services/login.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { firstValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

/**
 * @file login.component.ts
 * @description Diese Komponente stellt die Anmeldeseite der Anwendung dar.
 * Sie ermöglicht es Benutzern, sich mit einem Benutzernamen und Passwort anzumelden
 * und leitet sie nach erfolgreicher Anmeldung um.
 */

/**
 * @class LoginComponent
 * @description Eine Angular Standalone-Komponente für die Benutzeranmeldung.
 * Sie interagiert mit dem `LoginService`, um Authentifizierungsanfragen zu verwalten,
 * und dem `Router` für die Navigation.
 */
@Component({
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-login-component',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './login.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei.
   */
  styleUrl: './login.component.css',
  /**
   * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
   */
  imports: [
    MatCardModule,         // Angular Material Modul für Karten.
    MatInputModule,        // Angular Material Modul für Eingabefelder.
    MatButtonModule,       // Angular Material Modul für Buttons.
    ReactiveFormsModule,   // Ermöglicht die Verwendung von reaktiven Formularen.
    RouterModule,          // Ermöglicht die Navigation über RouterLink-Direktiven.
    CommonModule,          // Stellt allgemeine Direktiven wie ngIf und ngFor bereit.
    FormsModule,           // Ermöglicht die Verwendung von Template-Driven Forms.
    HttpClientModule       // Ermöglicht die Verwendung des HttpClient in dieser Komponente.
  ],
})
export class LoginComponent implements OnInit {
  /**
   * @property {string} username - Das Modell für das Benutzernamen-Eingabefeld.
   */
  username = '';

  /**
   * @property {string} password - Das Modell für das Passwort-Eingabefeld.
   */
  password = '';

  /**
   * @property {string} errorMsg - Eine Nachricht, die bei einem Login-Fehler angezeigt wird.
   */
  errorMsg = '';

  /**
   * @property {typeof RoutingEnum} routingEnum - Eine Referenz auf das RoutingEnum für die Verwendung im Template.
   */
  routingEnum = RoutingEnum;

  /**
   * @property {string} redirectUrl - Die URL, zu der nach erfolgreicher Anmeldung umgeleitet werden soll.
   * Wird aus den Query-Parametern der Route gelesen.
   */
  redirectUrl = '';

  /**
   * Erstellt eine Instanz von LoginComponent.
   * @param {LoginService} loginService - Der Dienst für Benutzerauthentifizierung und -verwaltung.
   * @param {Router} router - Der Angular Router für die Navigation.
   * @param {ActivatedRoute} route - Der ActivatedRoute-Dienst, um auf Routenparameter zuzugreifen.
   */
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Abonniert die Query-Parameter der Route, um die `redirectUrl` zu extrahieren.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirect'] || '/'; // Setzt die Umleitungs-URL oder den Root-Pfad als Standard.
    });
  }

  /**
   * @method login
   * @description Versucht, den Benutzer mit den eingegebenen Anmeldeinformationen anzumelden.
   * Bei erfolgreicher Anmeldung wird der Benutzer zur `redirectUrl` navigiert.
   * Bei einem Fehler wird eine Fehlermeldung angezeigt.
   * @returns {Promise<void>} Ein Promise, das auflöst, wenn der Login-Prozess abgeschlossen ist.
   */
  async login(): Promise<void> {
    try {
      // Versucht, sich beim LoginService anzumelden und wartet auf das Ergebnis.
      await firstValueFrom(
        this.loginService.login(this.username, this.password)
      )
      // Navigiert zur Umleitungs-URL.
      this.router.navigateByUrl(this.redirectUrl);
      // Scrollt die Seite nach oben.
      window.scrollTo({top:0});
    } catch (err: any) {
      // Fängt Fehler ab, die während des Logins auftreten.
      console.error('Login-Fehler:', err); // Loggt den Fehler.
      this.errorMsg = err.message || 'Unbekannter Fehler beim Login'; // Setzt die Fehlermeldung.
    }
  }
}
