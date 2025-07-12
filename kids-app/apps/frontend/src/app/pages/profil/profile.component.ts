/* eslint-disable @angular-eslint/prefer-inject */
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserDTO, InterestEnum } from '@kids-app/share';
import { LoginService } from '../../shared/services/login.service';
import {
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../../shared/services/event.service';

/**
 * @file profile.component.ts
 * @description Diese Komponente stellt die Profilseite des angemeldeten Benutzers dar.
 * Sie ermöglicht es dem Benutzer, seine persönlichen Informationen anzuzeigen und zu bearbeiten,
 * sowie seine Freundesliste, Event-Historie und gebuchte Events zu verwalten.
 */

/**
 * @class ProfilePageComponent
 * @description Eine Angular Standalone-Komponente für die Benutzerprofilseite.
 * Sie interagiert mit dem `LoginService` zur Verwaltung der Benutzerdaten
 * und dem `EventService` zum Abrufen von Event-Informationen.
 */
@Component({
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-profile-page',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './profile.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei.
   */
  styleUrl: './profile.component.css',
  /**
   * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
   */
  imports: [
    CommonModule,          // Stellt allgemeine Direktiven wie ngIf und ngFor bereit.
    FormsModule,           // Ermöglicht die Verwendung von Template-Driven Forms.
    MatCardModule,         // Angular Material Modul für Karten.
    MatFormFieldModule,    // Angular Material Modul für Formularfelder.
    MatInputModule,        // Angular Material Modul für Eingabefelder.
    MatButtonModule,       // Angular Material Modul für Buttons.
    MatSelectModule,       // Angular Material Modul für Dropdown-Auswahlen.
    MatIconModule,         // Angular Material Modul für Icons.
    MatProgressSpinnerModule, // Angular Material Modul für Lade-Spinner.
  ],
  /**
   * @property {Array<any>} providers - Dienste, die speziell für diese Komponente bereitgestellt werden.
   */
  providers: [EventService], // Der EventService wird hier bereitgestellt.
})
export class ProfilePageComponent implements OnInit {
  /**
   * @property {typeof RoutingEnum} routingEnum - Eine Referenz auf das RoutingEnum für die Verwendung im Template.
   */
  routingEnum = RoutingEnum;

  /**
   * @property {Observable<UserDTO | undefined>} user$ - Ein Observable, das den aktuellen Benutzerstatus emittiert.
   * Wird vom `LoginService` bereitgestellt.
   */
  user$: Observable<UserDTO | undefined>;

  /**
   * @property {UserDTO | null} editableUser - Eine Kopie des Benutzerobjekts, die für die Bearbeitung im Formular verwendet wird.
   * Aktuell nicht direkt im Code verwendet, aber für zukünftige Bearbeitungsfunktionen vorgesehen.
   */
  editableUser: UserDTO | null = null;

  /**
   * @property {boolean} isLoading - Ein Flag, das den Ladezustand der Komponente anzeigt.
   */
  isLoading = true;

  /**
   * @property {InterestEnum[]} interests - Eine Liste aller verfügbaren Interessen aus dem `InterestEnum`.
   * Wird für die Auswahl der Interessen im Profil verwendet.
   */
  interests = Object.values(InterestEnum);

  /**
   * @property {string[]} friendNames - Eine Liste der Namen von Freunden des Benutzers.
   * Wird dynamisch basierend auf `friendIds` geladen.
   */
  friendNames: string[] = [];

  /**
   * @property {string[]} eventHistoryTitles - Eine Liste der Titel von Events, die der Benutzer besucht hat.
   * Wird dynamisch basierend auf `eventHistoryIds` geladen.
   */
  eventHistoryTitles: string[] = [];

  /**
   * @property {string[]} bookedEventTitles - Eine Liste der Titel von Events, die der Benutzer gebucht hat.
   * Wird dynamisch basierend auf `bookedEventIds` geladen.
   */
  bookedEventTitles: string[] = [];

  /**
   * @property {{ [title: string]: string }} eventDatesMap - Eine Map, die Event-Titel den formatierten Daten zuordnet.
   * Wird verwendet, um das Datum gebuchter Events anzuzeigen.
   */
  eventDatesMap: { [title: string]: string } = {};

  /**
   * Erstellt eine Instanz von ProfilePageComponent.
   * @param {LoginService} loginService - Der Dienst für Benutzerauthentifizierung und -verwaltung.
   * @param {EventService} eventService - Der Dienst für Event-bezogene Operationen.
   * @param {Router} router - Der Angular Router für die Navigation.
   */
  constructor(
    private readonly loginService: LoginService,
    private readonly eventService: EventService,
    private readonly router: Router,
  ) {
    this.user$ = this.loginService.currentUser$; // Abonniert den aktuellen Benutzerstatus.
  }

  /**
   * @method ngOnInit
   * @description Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Abonniert den `user$`-Observable, um die Benutzerdaten zu laden.
   * Wenn ein Benutzer angemeldet ist, werden Freundesnamen, Event-Historie und gebuchte Events geladen.
   */
  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (!user) {
        // Wenn kein Benutzer angemeldet ist, zur Login-Seite umleiten.
        this.router.navigate(['/', this.routingEnum.LOGIN]);
        return;
      }

      // Lädt die Namen der Freunde des Benutzers.
      this.friendNames = []; // Setzt die Liste zurück, um Duplikate bei erneuter Subscription zu vermeiden.
      user.friendIds.forEach((friendId) => {
        this.loginService.getUserInformation(friendId).subscribe((friend) => {
          const fullName = `${friend.firstName} ${friend.lastName}`;
          if (!this.friendNames.includes(fullName)) {
            this.friendNames.push(fullName);
          }
        });
      });

      // Lädt die Titel der Events in der Event-Historie des Benutzers.
      this.eventHistoryTitles = []; // Setzt die Liste zurück.
      user.eventHistoryIds.forEach((eventId) => {
        this.eventService.getEventById(eventId).subscribe((event) => {
          if (event?.title && !this.eventHistoryTitles.includes(event.title)) {
            this.eventHistoryTitles.push(event.title);
          }
        });
      });

      // Lädt die Titel und Daten der gebuchten Events des Benutzers.
      this.bookedEventTitles = []; // Setzt die Liste zurück.
      this.eventDatesMap = {}; // Setzt die Map zurück.
      user.bookedEventIds.forEach((eventId) => {
        this.eventService.getEventById(eventId).subscribe((event) => {
          if (event?.title) {
            // Formatiert das Datum für eine lesbare Anzeige.
            const readableDate = new Date(event.date).toLocaleString('de-DE', {
              dateStyle: 'short',
              timeStyle: 'short',
            });
            this.bookedEventTitles.push(event.title);
            this.eventDatesMap[event.title] = readableDate;
          }
        });
      });

      this.isLoading = false; // Setzt den Lade-Indikator auf false, sobald alle Daten geladen sind.
    });
  }

  /**
   * @method saveChanges
   * @description Speichert die Änderungen an den Benutzerdaten im Backend.
   * Ruft die `updateCurrentUser`-Methode des `LoginService` auf.
   */
  saveChanges(): void {
    console.log('DIE USER DATEN:', this.loginService.getCurrentUser()); // Loggt die aktuellen Benutzerdaten.
    this.loginService.updateCurrentUser(); // Ruft die Aktualisierungsmethode auf.
  }

  /**
   * @method removeFriend
   * @description Entfernt einen Freund aus der Freundesliste des Benutzers.
   * Aktualisiert die Benutzerdaten im Backend und die lokale `friendNames`-Liste.
   * @param {string} friendName - Der vollständige Name des zu entfernenden Freundes.
   */
  removeFriend(friendName: string): void {
    this.user$.subscribe((user) => {
      if (!user) return; // Wenn kein Benutzer angemeldet ist, abbrechen.

      // Findet die ID des Freundes, der entfernt werden soll.
      user.friendIds.find((id) =>
        this.loginService.getUserInformation(id).subscribe((friend) => {
          const fullName = `${friend.firstName} ${friend.lastName}`;
          if (fullName === friendName) {
            user.friendIds = user.friendIds.filter((fid) => fid !== id); // Entfernt die Freundes-ID.
            this.loginService.updateCurrentUser().subscribe(() => {
              // Bei erfolgreicher Aktualisierung im Backend, aktualisiert die lokale Liste.
              this.friendNames = this.friendNames.filter((f) => f !== friendName);
            });
          }
        })
      );
    });
  }

  /**
   * @method removeBookedEvent
   * @description Entfernt ein gebuchtes Event aus der Liste des Benutzers.
   * Aktualisiert die Benutzerdaten im Backend und die lokale `bookedEventTitles`-Liste.
   * @param {string} eventTitle - Der Titel des zu entfernenden Events.
   */
  removeBookedEvent(eventTitle: string): void {
    this.user$.subscribe((user) => {
      if (!user) return; // Wenn kein Benutzer angemeldet ist, abbrechen.

      // Findet die ID des gebuchten Events, das entfernt werden soll.
      user.bookedEventIds.find((eventId) => {
        return this.eventService.getEventById(eventId).subscribe((event) => {
          if (event.title === eventTitle) {
            user.bookedEventIds = user.bookedEventIds.filter((eid) => eid !== eventId); // Entfernt die Event-ID.
            this.loginService.updateCurrentUser().subscribe(() => {
              // Bei erfolgreicher Aktualisierung im Backend, aktualisiert die lokale Liste.
              this.bookedEventTitles = this.bookedEventTitles.filter((e) => e !== eventTitle);
            });
          }
        });
      });
    });
  }
}
