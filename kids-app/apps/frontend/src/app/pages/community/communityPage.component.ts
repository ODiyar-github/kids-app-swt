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
// Importiere `of` für leere Observables und `switchMap` für das chaining
import { forkJoin, map, Observable, Subscription, of, switchMap } from 'rxjs';
import { EventService } from '../../shared/services/event.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // Notwendig für mat-button im Template

@Component({
  standalone: true,
  selector: 'app-community-component',
  templateUrl: './communityPage.component.html',
  styleUrl: './communityPage.component.css',
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
    MatButtonModule, // Sicherstellen, dass der Button-Import vorhanden ist
  ],
  providers: [EventService], // `EventService` wird hier bereitgestellt
})
export class CommunityComponent implements OnInit, OnDestroy {
  routingEnum = RoutingEnum;

  user$: Observable<UserDTO | undefined>; // Observable für den aktuellen Benutzer
  userModel!: UserModel; // UserModel des aktuellen Benutzers
  friendModels: UserModel[] = []; // Liste der UserModels für Freunde
  userNews: Logs[] = []; // Neuigkeiten aus der Community
  recommendations: EventDTO[] = []; // Empfohlene Veranstaltungen
  isLoading = true; // Lade-Indikator

  searchTerm = ''; // Suchbegriff für Benutzer
  searchResults: UserDTO[] = []; // Suchergebnisse für Benutzer

  private subscription = new Subscription(); // Verwaltung für Subscriptions

  constructor(
    private readonly loginService: LoginService,
    private readonly eventService: EventService,
    private readonly cdr: ChangeDetectorRef, // Für manuelle Änderungsdetektion
    private readonly router: Router
  ) {
    this.user$ = this.loginService.currentUser$; // Den Observable vom LoginService holen
  }

  ngOnInit(): void {
    this.subscription.add(
      this.user$.pipe(
        // Sobald der Benutzer verfügbar ist, initialisiere die Daten
        switchMap((user) => {
          if (!user) {
            // Wenn kein Benutzer angemeldet ist, umleiten und leeres Observable zurückgeben
            this.router.navigate(['/', this.routingEnum.LOGIN], {
              queryParams: { redirect: this.routingEnum.COMMUNITY },
            });
            return of(null); // Wichtig: Hier null zurückgeben, damit der nächste Tap/Subscribe weiß, dass umgeleitet wird
          }
          this.userModel = new UserModel(user); // UserModel des aktuellen Benutzers initialisieren
          // Lade Freunde und Events parallel und gib ihre Observables zurück
          return forkJoin([
            this.loadFriendModels(user.friendIds), // friends laden
            this.eventService.getEventList(), // Alle Events laden
          ]);
        })
      ).subscribe({
        next: (results) => {
          if (results === null) {
            // Umleitung hat stattgefunden, nichts weiter tun
            return;
          }
          const [friends, allEvents] = results; // Ergebnisse von forkJoin entpacken
          this.friendModels = friends; // Freunde zuweisen
          this.userNews = this.userModel.getCommunityNews(friends); // Neuigkeiten generieren
          this.recommendations = this.userModel.getEventRecommendations(allEvents); // Empfehlungen generieren
          this.isLoading = false; // Ladevorgang beendet
          this.cdr.detectChanges(); // UI aktualisieren
        },
        error: (err) => {
          console.error('Fehler beim Laden der Community-Daten:', err);
          this.isLoading = false; // Ladevorgang beendet auch bei Fehler
        },
      })
    );
  }

  // Hilfsmethode zum Laden der Freundesmodelle anhand ihrer IDs
  private loadFriendModels(friendIds: string[]): Observable<UserModel[]> {
    if (!friendIds || friendIds.length === 0) {
      return of([]); // Wenn keine Freundes-IDs vorhanden sind, leeres Array zurückgeben
    }
    // Erstelle ein Array von Observables, um jede Freundes-Info abzurufen
    const requests = friendIds.map((friendId) =>
      this.loginService.getUserInformation(friendId)
    );
    // Kombiniere die Observables und mappe die UserDTOs zu UserModels
    return forkJoin(requests).pipe(map((users) => users.map((u) => new UserModel(u))));
  }

  // Suchfunktion für Benutzer
  onSearchUser(): void {
    if (!this.searchTerm || this.searchTerm.trim().length < 2) {
      this.searchResults = []; // Suchergebnisse leeren, wenn der Suchbegriff zu kurz ist
      return;
    }

    // Alle Benutzer vom LoginService abrufen
    this.loginService.getAllUsers().subscribe((allUsers) => {
      this.searchResults = allUsers.filter((u) => {
        const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
        // Filtere nach Übereinstimmung, schließe den aktuellen Benutzer aus
        // und schließe bereits bestehende Freunde aus
        return (
          fullName.includes(this.searchTerm.toLowerCase()) &&
          u.userId !== this.userModel.getUserDto().userId &&
          !(this.userModel.getUserDto().friendIds || []).includes(u.userId)
        );
      });
      this.cdr.detectChanges(); // UI aktualisieren, um die Suchergebnisse anzuzeigen
    });
  }

  // Funktion zum Hinzufügen eines Freundes
  addFriend(userToAdd: UserDTO, currentUser: UserDTO): void {
    if (!currentUser.friendIds) {
      currentUser.friendIds = [];
    }

    currentUser.friendIds.push(userToAdd.userId);

    this.loginService.updateCurrentUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Alle Subscriptions aufräumen
  }
}