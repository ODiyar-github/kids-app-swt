/* eslint-disable @angular-eslint/prefer-inject */
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EventDTO, InterestEnum, Logs, UserDTO } from '@kids-app/share';
import { MapComponent } from './mapComponent/map.component';
import { EventService } from '../../../shared/services/event.service';
import { LoginService } from '../../../shared/services/login.service';
import { map, Observable, Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weaterComponent/weather.component';
import { RoutingEnum } from '../../../shared/enums/routing.enum';
import { EventPreviewComponent } from '../../dashboard/eventPreview/eventPreview.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RatingEnum } from '@kids-app/share';
import { EventFeedBackDto } from '@kids-app/share';
import { MatListModule } from '@angular/material/list';

/**
 * @file eventDetails.component.ts
 * @description Diese Komponente zeigt die detaillierten Informationen eines einzelnen Events an.
 * Sie umfasst Event-Details, eine Karte mit dem Event-Standort, Wettervorhersagen und
 * empfohlene Events basierend auf Interessen. Benutzer können sich für Events anmelden und Feedback geben.
 */

/**
 * @class EventDetailsComponent
 * @description Eine Angular Standalone-Komponente, die die Detailansicht eines Events darstellt.
 * Sie interagiert mit `LoginService` und `EventService`, um Benutzer- und Event-Daten zu verwalten.
 * Sie implementiert `OnInit` und `OnDestroy` für Lifecycle-Hooks.
 */
@Component({
  standalone: true,
  selector: 'app-event-details-component',
  templateUrl: './eventDetails.component.html',
  styleUrl: './eventDetails.component.css',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MapComponent,
    WeatherComponent,
    EventPreviewComponent,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [EventService],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  /**
   * @property routingEnum
   * @description Stellt die Enum für Routing-Pfade bereit, um Typsicherheit bei der Navigation zu gewährleisten.
   */
  routingEnum = RoutingEnum;

  /**
   * @property event
   * @description Das EventDTO-Objekt, das die detaillierten Informationen des aktuell angezeigten Events enthält.
   * Wird als Input von einer übergeordneten Komponente übergeben.
   */
  @Input() event!: EventDTO;

  /**
   * @property user$
   * @description Ein Observable, das den aktuellen Benutzerstatus emittiert.
   * Dient dazu, Änderungen am eingeloggten Benutzer zu verfolgen.
   */
  user$: Observable<UserDTO | undefined> | undefined;

  /**
   * @property currentUser
   * @description Das aktuelle UserDTO-Objekt des eingeloggten Benutzers.
   * Wird aus dem `user$` Observable abgeleitet.
   */
  currentUser: UserDTO | undefined;

  /**
   * @property recommendations$
   * @description Ein Observable, das eine Liste von EventDTO-Objekten enthält, die als Empfehlungen
   * basierend auf den Interessen des aktuell angezeigten Events dienen.
   */
  recommendations$!: Observable<EventDTO[]>;

  /**
   * @property showFeedbackForm
   * @description Ein Boolean-Flag, das steuert, ob das Feedback-Formular sichtbar ist oder nicht.
   */
  showFeedbackForm = false;

  /**
   * @property feedbackForm
   * @description Die FormGroup für das Feedback-Formular, die die Formularfelder und Validierungsregeln definiert.
   */
  feedbackForm: FormGroup;

  /**
   * @property showConfirmation
   * @description Ein Boolean-Flag, das steuert, ob die Bestätigungsmeldung nach dem Absenden des Feedbacks sichtbar ist.
   */
  showConfirmation = false;

  /**
   * @property ratingOptions
   * @description Ein Array von Objekten, das die verfügbaren Bewertungsoptionen für das Feedback-Formular darstellt,
   * inklusive Wert (RatingEnum) und lesbarem Anzeigetext.
   */
  ratingOptions = [
    { value: RatingEnum.Excellent, viewValue: 'Ausgezeichnet (5 Sterne)' },
    { value: RatingEnum.Good, viewValue: 'Gut (4 Sterne)' },
    { value: RatingEnum.Average, viewValue: 'Durchschnittlich (3 Sterne)' },
    { value: RatingEnum.Bad, viewValue: 'Schlecht (2 Sterne)' },
    { value: RatingEnum.VeryBad, viewValue: 'Sehr schlecht (1 Stern)' },
  ];

  /**
   * @property subscription
   * @description Verwaltet alle RxJS-Subscriptions, um sicherzustellen, dass sie beim Zerstören der Komponente
   * ordnungsgemäß abgemeldet werden, um Memory Leaks zu vermeiden.
   */
  private subscription = new Subscription();

  /**
   * @constructor
   * @description Initialisiert eine neue Instanz der EventDetailsComponent.
   * Injiziert benötigte Services und initialisiert das Feedback-Formular.
   * @param loginService Zum Verwalten des Benutzer-Login-Status.
   * @param eventService Zum Abrufen und Aktualisieren von Event-Daten.
   * @param router Zum Navigieren zwischen Routen.
   * @param cdr Zum manuellen Auslösen der Change Detection, wenn nötig.
   * @param fb Zum Erstellen von FormGroup-Instanzen für reaktive Formulare.
   */
  constructor(
    private readonly loginService: LoginService,
    private readonly eventService: EventService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder
  ) {
    this.feedbackForm = this.fb.group({
      rating: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  /**
   * @method ngOnInit
   * @description Lifecycle-Hook, der nach der Initialisierung der Komponente aufgerufen wird.
   * Abonniert den aktuellen Benutzerstatus und lädt Event-Empfehlungen, falls ein Event vorhanden ist.
   */
  ngOnInit(): void {
    this.user$ = this.loginService.currentUser$;
    this.subscription.add(
      this.user$.subscribe(user => {
        this.currentUser = user;
        // Wichtig: Trigger Change Detection, falls sich user oder Feedback-Status ändert
        this.cdr.detectChanges();
      })
    );
    this.loadRecommendations();
  }

  /**
   * @method loadRecommendations
   * @description Lädt Event-Empfehlungen basierend auf den Kategorien des aktuellen Events.
   * Filtert die Event-Liste, um nur relevante und nicht das aktuelle Event selbst anzuzeigen.
   */
  private loadRecommendations(): void {
    this.recommendations$ = this.eventService.getEventList().pipe(
      map((eventList) => {
        return this.getEventsByInterest(this.event.category, eventList);
      })
    );
    this.cdr.detectChanges();
  }

  /**
   * @method login
   * @description Leitet den Benutzer zur Login-Seite weiter.
   * Nach erfolgreichem Login wird der Benutzer zur Event-Detailseite zurückgeleitet.
   */
  login(): void {
    this.router.navigate(['/', this.routingEnum.LOGIN], {
      queryParams: { redirect: `/${this.routingEnum.EVENT}/${this.event.uuid}` },
    });
  }

  /**
   * @method addEventToUserList
   * @description Fügt das aktuelle Event zur Liste der gebuchten Events des Benutzers hinzu.
   * Aktualisiert den Benutzerstatus über den LoginService und fügt einen Log-Eintrag hinzu.
   * @param user Das UserDTO-Objekt des aktuell eingeloggten Benutzers.
   */
  addEventToUserList(user: UserDTO): void {
    if (user.bookedEventIds.includes(this.event.uuid)) {
      return; // Event wurde bereits gebucht, keine Aktion erforderlich
    }
    user.bookedEventIds.push(this.event.uuid);
    user.logs.push(new Logs(user.firstName + ' ' + user.lastName, new Date().toISOString(), this.event.uuid, 'Teilnahme am ' + this.event.title));
    this.loginService.updateCurrentUser(); // Speichert den aktualisierten Benutzer im lokalen Speicher
    this.cdr.detectChanges(); // Erzwingt eine UI-Aktualisierung
  }

  /**
   * @method getEventsByInterest
   * @description Filtert eine Liste von Events, um diejenigen zurückzugeben, die relevante Interessen teilen.
   * Schließt das aktuell angezeigte Event aus den Empfehlungen aus.
   * @param interests Ein Array von InterestEnum, das die Interessenkategorien darstellt.
   * @param events Ein Array von EventDTO-Objekten, das die vollständige Liste der Events ist.
   * @returns Ein gefiltertes Array von EventDTO-Objekten.
   */
  private getEventsByInterest(interests: InterestEnum[], events: EventDTO[]): EventDTO[] {
    if (!interests || interests.length === 0) return [];

    return events.filter(
      (event) => interests.some((i) => event.category.includes(i)) && event.uuid !== this.event.uuid
    );
  }

  /**
   * @method hasUserAlreadyCommented
   * @description Prüft, ob der aktuell eingeloggte Benutzer bereits einen Kommentar
   * für das Event hinterlassen hat. Dies geschieht durch Überprüfung der `feedBack`-Liste
   * des Events auf die `userId` des aktuellen Benutzers.
   * @returns {boolean} `true`, wenn der Benutzer bereits kommentiert hat, sonst `false`.
   */
  hasUserAlreadyCommented(): boolean {
    if (!this.currentUser || !this.event || !this.event.feedBack) {
      return false; // Kein Benutzer, kein Event oder kein Feedback => kann nicht kommentiert haben
    }
    // Überprüfe, ob ein Feedback-Eintrag die userId des aktuellen Benutzers hat
    return this.event.feedBack.some(feedback => feedback.userId === this.currentUser?.userId);
  }

  /**
   * @method toggleFeedbackForm
   * @description Schaltet die Sichtbarkeit des Feedback-Formulars um.
   * Setzt das Formular zurück, wenn es geöffnet wird.
   */
  toggleFeedbackForm(): void {
    this.showFeedbackForm = !this.showFeedbackForm;
    if (this.showFeedbackForm) {
      this.feedbackForm.reset();
    }
  }

  /**
   * @method closeFeedbackForm
   * @description Schließt das Feedback-Formular und setzt es zurück.
   */
  closeFeedbackForm(): void {
    this.showFeedbackForm = false;
    this.feedbackForm.reset();
  }

  /**
   * @method getRatingViewValue
   * @description Konvertiert einen numerischen `RatingEnum`-Wert in eine lesbare Zeichenfolge
   * (z.B. "Ausgezeichnet (5 Sterne)").
   * @param rating Der `RatingEnum`-Wert, der konvertiert werden soll.
   * @returns Eine Zeichenfolge, die den lesbaren Wert der Bewertung darstellt, oder 'Unbekannt',
   * wenn der Wert nicht gefunden wird.
   */
  getRatingViewValue(rating: RatingEnum): string {
    const option = this.ratingOptions.find(opt => opt.value === rating);
    return option ? option.viewValue : 'Unbekannt';
  }

  /**
   * @method onSubmitFeedback
   * @description Verarbeitet das Absenden des Feedback-Formulars.
   * Führt Validierungen durch, erstellt ein neues `EventFeedBackDto`, fügt es dem Event hinzu
   * und sendet das aktualisierte Event an den `EventService`.
   * Zeigt bei Erfolg eine Bestätigung an und schließt das Formular.
   */
  onSubmitFeedback(): void {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched(); // Markiert alle Felder als berührt, um Validierungsfehler anzuzeigen
      console.warn('Feedback-Formular ist ungültig.');
      return;
    }

    if (!this.currentUser || !this.currentUser.userId || !this.currentUser.firstName) {
      console.warn('Benutzer nicht angemeldet oder unvollständig. Feedback kann nicht gesendet werden.');
      this.router.navigate(['/login']); // Leitet zur Login-Seite um
      return;
    }

    if (!this.event || !this.event.uuid) {
      console.error('Kein Event geladen oder Event-UUID fehlt, kann Feedback nicht senden.');
      return;
    }

    // Zusätzliche Prüfung: Wenn der Benutzer bereits kommentiert hat, abbrechen.
    if (this.hasUserAlreadyCommented()) {
      console.warn('Benutzer hat bereits Feedback für dieses Event hinterlassen.');
      // Optional: Eine Nachricht an den Benutzer anzeigen, dass er bereits Feedback gegeben hat.
      return;
    }

    const formValues = this.feedbackForm.value;

    const newEventFeedback: EventFeedBackDto = new EventFeedBackDto(
      this.currentUser.userId,
      `${this.currentUser.firstName} ${this.currentUser.lastName || ''}`.trim(),
      formValues.rating,
      formValues.message
    );

    // Initialisiert das Feedback-Array, falls es noch nicht existiert
    if (!this.event.feedBack) {
      this.event.feedBack = [];
    }
    // Fügt das neue Feedback lokal zum Event hinzu
    this.event.feedBack.push(newEventFeedback);

    // Sendet das gesamte aktualisierte Event-Objekt an den Service
    this.eventService.updateEvent(this.event).subscribe({
      next: (updatedEvent) => {
        console.log('Event-Feedback erfolgreich gesendet und Event aktualisiert:', updatedEvent);
        this.event = updatedEvent; // Aktualisiert das lokale Event mit den Daten vom Backend
        this.showConfirmation = true;
        // Wichtig: Sobald Feedback gesendet, Formular schließen und Status aktualisieren
        this.showFeedbackForm = false;
        this.feedbackForm.reset(); // Formularfelder zurücksetzen
        this.cdr.detectChanges(); // UI-Update erzwingen, um hasUserAlreadyCommented zu reevaluieren
        setTimeout(() => {
          this.showConfirmation = false;
          this.cdr.detectChanges(); // Und wieder verstecken
        }, 5000); // Bestätigungsmeldung für 5 Sekunden anzeigen
      },
      error: (err) => {
        console.error('Fehler beim Senden des Event-Feedbacks:', err);
        // Hier sollte eine Fehlermeldung für den Benutzer angezeigt werden, z.B. mit MatSnackBar
      }
    });
  }

  /**
   * @method hasUserBookedEvent
   * @description Prüft, ob der aktuell eingeloggte Benutzer diese Veranstaltung gebucht hat.
   * Dies ist eine Voraussetzung dafür, Feedback geben zu können.
   * @returns {boolean} `true`, wenn das Event vom Benutzer gebucht wurde, sonst `false`.
   */
  hasUserBookedEvent(): boolean {
    if (!this.currentUser || !this.event || !this.currentUser.bookedEventIds) {
      return false; // Kein Benutzer, kein Event oder keine gebuchten Events => kann nicht gebucht haben
    }
    // Überprüft, ob die UUID des aktuellen Events in der Liste der gebuchten Event-IDs des Benutzers enthalten ist
    return this.currentUser.bookedEventIds.includes(this.event.uuid);
  }

  /**
   * @method ngOnDestroy
   * @description Lifecycle-Hook, der vor dem Zerstören der Komponente aufgerufen wird.
   * Meldet alle RxJS-Subscriptions ab, um Memory Leaks zu verhindern.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}