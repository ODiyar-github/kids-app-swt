/* eslint-disable @angular-eslint/prefer-inject */
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventDTO, Logs, UserDTO, UserModel } from '@kids-app/share';
import { LoginService } from '../../shared/services/login.service';
import { EventPreviewComponent } from '../dashboard/eventPreview/eventPreview.component';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { Router, RouterModule } from '@angular/router';
import { forkJoin, map, Observable, Subscription, of, switchMap } from 'rxjs';
import { EventService } from '../../shared/services/event.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/**
 * @file communityPage.component.ts
 * @description Diese Komponente repräsentiert die Community-Seite der Anwendung.
 * Sie zeigt Benutzer-Feeds, Freundeslisten, Event-Empfehlungen und eine Suchfunktion für Benutzer an.
 * Sie interagiert mit `LoginService` und `EventService`, um Daten abzurufen und zu verwalten.
 */

/**
 * @class CommunityComponent
 * @description Eine Angular Standalone-Komponente, die die Community-Seite der Anwendung darstellt.
 * Implementiert `OnInit` für die Initialisierung von Daten beim Laden der Komponente
 * und `OnDestroy` für das Aufräumen von Subscriptions.
 */
@Component({
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {string} selector - Der CSS-Selektor, der diese Komponente in HTML-Templates identifiziert.
   */
  selector: 'app-community-component',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei dieser Komponente.
   */
  templateUrl: './communityPage.component.html',
  /**
   * @property {string} styleUrl - Der Pfad zur CSS-Stylesheet-Datei dieser Komponente.
   */
  styleUrl: './communityPage.component.css',
  /**
   * @property {Array<any>} imports - Ein Array von Modulen, Standalone-Komponenten, Direktiven oder Pipes,
   * die diese Komponente benötigt.
   */
  imports: [
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    EventPreviewComponent,
    MatInputModule,
    MatButtonModule,
  ],
  /**
   * @property {Array<any>} providers - Ein Array von Diensten, die speziell für diese Komponente bereitgestellt werden.
   */
  providers: [EventService],
})
export class CommunityComponent implements OnInit, OnDestroy {
  /**
   * @property {typeof RoutingEnum} routingEnum - Eine Referenz auf das RoutingEnum für die Verwendung im Template.
   */
  routingEnum = RoutingEnum;

  /**
   * @property {Observable<UserDTO | undefined>} user$ - Ein Observable, das den aktuellen Benutzerstatus emittiert.
   */
  user$: Observable<UserDTO | undefined>;

  /**
   * @property {UserModel} userModel - Das UserModel des aktuell angemeldeten Benutzers.
   */
  userModel!: UserModel;

  /**
   * @property {UserModel[]} friendModels - Eine Liste von UserModels, die die Freunde des aktuellen Benutzers repräsentieren.
   */
  friendModels: UserModel[] = [];

  /**
   * @property {Logs[]} userNews - Eine Liste von Log-Einträgen, die die Neuigkeiten aus der Community darstellen.
   */
  userNews: Logs[] = [];

  /**
   * @property {EventDTO[]} recommendations - Eine Liste von empfohlenen Veranstaltungen für den aktuellen Benutzer.
   */
  recommendations: EventDTO[] = [];

  /**
   * @property {boolean} isLoading - Ein Flag, das den Ladezustand der Komponente anzeigt.
   */
  isLoading = true;

  /**
   * @property {string} searchTerm - Der aktuelle Suchbegriff für die Benutzersuche.
   */
  searchTerm = '';

  /**
   * @property {UserDTO[]} searchResults - Eine Liste von UserDTOs, die den Suchergebnissen entsprechen.
   */
  searchResults: UserDTO[] = [];

  /**
   * @private
   * @property {Subscription} subscription - Eine Subscription, die alle Observables verwaltet,
   * um Memory Leaks beim Zerstören der Komponente zu vermeiden.
   */
  private subscription = new Subscription();

  /**
   * Erstellt eine Instanz von CommunityComponent.
   * @param {LoginService} loginService - Der Dienst für Benutzerauthentifizierung und -verwaltung.
   * @param {EventService} eventService - Der Dienst für Event-bezogene Operationen.
   * @param {ChangeDetectorRef} cdr - Der ChangeDetectorRef für die manuelle Änderungsdetektion.
   * @param {Router} router - Der Angular Router für die Navigation.
   */
  constructor(
    private readonly loginService: LoginService,
    private readonly eventService: EventService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {
    this.user$ = this.loginService.currentUser$;
  }

  /**
   * @method ngOnInit
   * @description Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Er abonniert den `user$`-Observable, um Benutzerdaten zu laden, Freunde und Events abzurufen
   * und Empfehlungen sowie Community-Neuigkeiten zu generieren.
   */
  ngOnInit(): void {
    this.subscription.add(
      this.user$.pipe(
        switchMap((user) => {
          if (!user) {
            // Wenn kein Benutzer angemeldet ist, zur Login-Seite umleiten.
            this.router.navigate(['/', this.routingEnum.LOGIN], {
              queryParams: { redirect: this.routingEnum.COMMUNITY },
            });
            return of(null); // Gibt null zurück, um weitere Aktionen zu verhindern.
          }
          this.userModel = new UserModel(user); // Initialisiert das UserModel des aktuellen Benutzers.
          // Lädt Freunde und Events parallel und gibt deren Observables zurück.
          return forkJoin([
            this.loadFriendModels(user.friendIds),
            this.eventService.getEventList(),
          ]);
        })
      ).subscribe({
        next: (results) => {
          if (results === null) {
            // Wenn eine Umleitung stattgefunden hat, nichts weiter tun.
            return;
          }
          const [friends, allEvents] = results; // Entpackt die Ergebnisse von forkJoin.
          this.friendModels = friends; // Weist die geladenen Freunde zu.
          this.userNews = this.userModel.getCommunityNews(friends); // Generiert Neuigkeiten aus der Community.
          this.recommendations = this.userModel.getEventRecommendations(allEvents); // Generiert Event-Empfehlungen.
          this.isLoading = false; // Setzt den Lade-Indikator auf false.
          this.cdr.detectChanges(); // Erzwingt eine Aktualisierung der UI.
        },
        error: (err) => {
          console.error('Fehler beim Laden der Community-Daten:', err);
          this.isLoading = false; // Setzt den Lade-Indikator auch bei Fehlern auf false.
        },
      })
    );
  }

  /**
   * @private
   * @method loadFriendModels
   * @description Lädt die UserModels für eine gegebene Liste von Freundes-IDs.
   * @param {string[]} friendIds - Ein Array von Benutzer-IDs der Freunde.
   * @returns {Observable<UserModel[]>} Ein Observable, das ein Array von UserModel-Objekten emittiert.
   */
  private loadFriendModels(friendIds: string[]): Observable<UserModel[]> {
    if (!friendIds || friendIds.length === 0) {
      return of([]); // Gibt ein leeres Array zurück, wenn keine Freundes-IDs vorhanden sind.
    }
    // Erstellt ein Array von Observables, um die Informationen jedes Freundes abzurufen.
    const requests = friendIds.map((friendId) =>
      this.loginService.getUserInformation(friendId)
    );
    // Kombiniert die Observables und mappt die UserDTOs zu UserModels.
    return forkJoin(requests).pipe(map((users) => users.map((u) => new UserModel(u))));
  }

  /**
   * @method onSearchUser
   * @description Führt eine Benutzersuche basierend auf dem `searchTerm` durch.
   * Filtert die Ergebnisse, um den aktuellen Benutzer und bereits bestehende Freunde auszuschließen.
   */
  onSearchUser(): void {
    if (!this.searchTerm || this.searchTerm.trim().length < 2) {
      this.searchResults = []; // Leert die Suchergebnisse, wenn der Suchbegriff zu kurz ist.
      return;
    }

    // Ruft alle Benutzer vom LoginService ab.
    this.loginService.getAllUsers().subscribe((allUsers) => {
      this.searchResults = allUsers.filter((u) => {
        const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
        // Filtert nach Übereinstimmung, schließt den aktuellen Benutzer aus
        // und schließt bereits bestehende Freunde aus.
        return (
          fullName.includes(this.searchTerm.toLowerCase()) &&
          u.userId !== this.userModel.getUserDto().userId &&
          !(this.userModel.getUserDto().friendIds || []).includes(u.userId)
        );
      });
      this.cdr.detectChanges(); // Aktualisiert die UI, um die Suchergebnisse anzuzeigen.
    });
  }

  /**
   * @method addFriend
   * @description Fügt einen Benutzer zur Freundesliste des aktuellen Benutzers hinzu
   * und aktualisiert die Benutzerdaten im Backend.
   * @param {UserDTO} userToAdd - Der Benutzer, der zur Freundesliste hinzugefügt werden soll.
   * @param {UserDTO} currentUser - Der aktuell angemeldete Benutzer.
   */
  addFriend(userToAdd: UserDTO, currentUser: UserDTO): void {
    if (!currentUser.friendIds) {
      currentUser.friendIds = []; // Initialisiert die Freundes-IDs, falls nicht vorhanden.
    }

    currentUser.friendIds.push(userToAdd.userId); // Fügt die ID des neuen Freundes hinzu.

    this.loginService.updateCurrentUser(); // Aktualisiert die Benutzerdaten im Backend.
  }

  /**
   * @method ngOnDestroy
   * @description Lifecycle-Hook, der beim Zerstören der Komponente aufgerufen wird.
   * Bereinigt alle offenen Subscriptions, um Memory Leaks zu verhindern.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Beendet alle aktiven Subscriptions.
  }
}
