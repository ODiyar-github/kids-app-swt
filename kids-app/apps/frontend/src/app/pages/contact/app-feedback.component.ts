/* eslint-disable @angular-eslint/prefer-inject */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDTO } from '@kids-app/share';
import { AppFeedback, AppFeedbackEnum } from '@kids-app/share';
import { FeedbackService } from '../../shared/services/app.feedback.service';
import { LoginService } from '../../shared/services/login.service';
import { take } from 'rxjs/operators';

/**
 * @file app-feedback.component.ts
 * @description Diese Komponente ermöglicht es Benutzern, Feedback zur Anwendung zu geben und
 * zeigt eine Liste des bereits vorhandenen Feedbacks an.
 * Sie interagiert mit `FeedbackService` zum Senden und Abrufen von Feedback
 * und mit `LoginService` zur Überprüfung des angemeldeten Benutzers.
 */

/**
 * @class AppFeedbackComponent
 * @description Eine Angular Standalone-Komponente für die Feedback-Seite der Anwendung.
 * Sie enthält ein Formular zum Senden neuen Feedbacks und zeigt eine Liste
 * der bestehenden Feedback-Einträge an.
 */
@Component({
  /**
   * @property {string} selector - Der CSS-Selektor für diese Komponente.
   */
  selector: 'app-app-feedback',
  /**
   * @property {string} templateUrl - Der Pfad zur HTML-Template-Datei.
   */
  templateUrl: './app-feedback.component.html',
  /**
   * @property {string[]} styleUrls - Die Pfade zu den CSS-Stylesheet-Dateien.
   */
  styleUrls: ['./app-feedback.component.css'],
  /**
   * @property {boolean} standalone - Gibt an, dass diese Komponente eine Standalone-Komponente ist.
   */
  standalone: true,
  /**
   * @property {Array<any>} imports - Module, Komponenten, Direktiven oder Pipes, die diese Komponente benötigt.
   */
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  /**
   * @property {Array<any>} providers - Dienste, die speziell für diese Komponente bereitgestellt werden.
   */
  providers: [
    FeedbackService
  ],
})
export class AppFeedbackComponent implements OnInit {
  /**
   * @property {boolean} showForm - Steuert die Sichtbarkeit des Feedback-Formulars.
   */
  showForm = false;

  /**
   * @property {boolean} showConfirmation - Steuert die Sichtbarkeit der Bestätigungsmeldung nach dem Senden.
   */
  showConfirmation = false;

  /**
   * @property {FormGroup} feedbackForm - Das FormGroup für das reaktive Feedback-Formular.
   */
  feedbackForm: FormGroup;

  /**
   * @property {Observable<UserDTO | undefined>} user$ - Ein Observable, das den aktuellen Benutzerstatus emittiert.
   */
  user$: Observable<UserDTO | undefined>;

  /**
   * @property {AppFeedback[]} allFeedbacks - Ein Array, das alle abgerufenen Feedback-Einträge speichert.
   */
  allFeedbacks: AppFeedback[] = [];

  /**
   * @property {boolean} isLoadingFeedbacks - Zeigt an, ob Feedback-Einträge geladen werden.
   */
  isLoadingFeedbacks = true;

  /**
   * @property {Array<{value: AppFeedbackEnum, viewValue: string}>} ratingOptions - Optionen für das Feedback-Rating-Dropdown.
   */
  ratingOptions = [
    { value: AppFeedbackEnum.BugReport, viewValue: 'Fehler melden' },
    { value: AppFeedbackEnum.FeatureRequest, viewValue: 'Funktionswunsch' },
    { value: AppFeedbackEnum.GeneralFeedback, viewValue: 'Allgemeines Feedback' },
    { value: AppFeedbackEnum.PerformanceIssue, viewValue: 'Performance-Problem' },
    { value: AppFeedbackEnum.UIUXIssue, viewValue: 'Design/Usability-Problem' },
    { value: AppFeedbackEnum.Other, viewValue: 'Sonstiges' },
  ];

  /**
   * Erstellt eine Instanz von AppFeedbackComponent.
   * @param {FormBuilder} fb - Der FormBuilder zum Erstellen des reaktiven Formulars.
   * @param {Router} router - Der Angular Router für die Navigation.
   * @param {FeedbackService} feedBackService - Der Dienst zum Senden und Abrufen von Feedback.
   * @param {LoginService} userService - Der Dienst zur Verwaltung des Benutzerstatus.
   * @param {ChangeDetectorRef} cdr - Der ChangeDetectorRef für die manuelle Änderungsdetektion.
   */
  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly feedBackService: FeedbackService,
    private readonly userService: LoginService,
    private readonly cdr: ChangeDetectorRef
  ) {
    // Initialisiert das Feedback-Formular mit Validatoren.
    this.feedbackForm = this.fb.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required],
    });
    // Abonniert den aktuellen Benutzerstatus vom LoginService.
    this.user$ = this.userService.currentUser$;
  }

  /**
   * @method ngOnInit
   * @description Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Lädt alle vorhandenen Feedback-Einträge.
   */
  ngOnInit() {
    this.loadAllFeedbacks();
  }

  /**
   * @private
   * @method loadAllFeedbacks
   * @description Ruft alle Feedback-Einträge vom `FeedbackService` ab und aktualisiert die `allFeedbacks`-Liste.
   * Verwaltet den Ladezustand (`isLoadingFeedbacks`).
   */
  private loadAllFeedbacks(): void {
    this.isLoadingFeedbacks = true;
    this.feedBackService.getAllFeedbacks().subscribe( (feedback)=>{
      this.allFeedbacks = feedback;
      console.log('DAS IST EIN TEST UM ZUSCHAUEN OB FEEDBACK ANKOMMT: ', this.allFeedbacks);
      this.isLoadingFeedbacks = false;
      this.cdr.detectChanges(); // Erzwingt eine Aktualisierung der UI.
    });
  }

  /**
   * @method getRatingViewValue
   * @description Gibt den lesbaren Textwert für eine gegebene `AppFeedbackEnum`-Bewertung zurück.
   * @param {AppFeedbackEnum} rating - Der Enum-Wert der Bewertung.
   * @returns {string} Der lesbare Textwert der Bewertung oder 'Unbekannt', falls nicht gefunden.
   */
  getRatingViewValue(rating: AppFeedbackEnum): string {
    const option = this.ratingOptions.find(opt => opt.value === rating);
    return option ? option.viewValue : 'Unbekannt';
  }

  /**
   * @method toggleForm
   * @description Schaltet die Sichtbarkeit des Feedback-Formulars um.
   * Setzt das Formular zurück, wenn es geöffnet wird.
   */
  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.feedbackForm.reset();
    }
  }

  /**
   * @method closeForm
   * @description Schließt das Feedback-Formular und setzt es zurück.
   */
  closeForm() {
    this.showForm = false;
    this.feedbackForm.reset();
  }

  /**
   * @method onSubmit
   * @description Behandelt das Absenden des Feedback-Formulars.
   * Überprüft die Gültigkeit des Formulars, ruft den aktuellen Benutzer ab und sendet das Feedback an das Backend.
   * Zeigt eine Bestätigung an und lädt die Feedback-Liste neu.
   */
  onSubmit() {
    // Wenn das Formular ungültig ist, alle Felder als berührt markieren und warnen.
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      console.warn('Formular ist ungültig.');
      return;
    }

    // Abonniert den aktuellen Benutzer, nimmt nur den ersten Wert und beendet das Abonnement.
    this.user$?.pipe(take(1)).subscribe(user => {
      if (user && user.userId) {
        const formValues = this.feedbackForm.value;

        // Erstellt ein neues AppFeedback-Objekt aus den Formulardaten und der Benutzer-ID.
        const feedbackToSend: AppFeedback = new AppFeedback(
          '', // UUID wird vom Backend generiert
          user.userId,
          formValues.rating,
          formValues.comment,
          new Date().toISOString() // Aktueller Zeitstempel
        );

        console.log('Sende Feedback an Backend:', feedbackToSend);

        // Sendet das Feedback über den FeedbackService.
        this.feedBackService.sendFeedBack(feedbackToSend).subscribe(
          (response) => {
            console.log('Feedback erfolgreich gesendet', response);
            this.showConfirmation = true; // Zeigt die Bestätigungsmeldung an.
            // Verbirgt die Bestätigungsmeldung nach 5 Sekunden.
            setTimeout(() => {
              this.showConfirmation = false;
            }, 5000);
            this.closeForm(); // Schließt und setzt das Formular zurück.
            this.loadAllFeedbacks(); // Lädt die Feedback-Liste neu, um das neue Feedback anzuzeigen.
          },
          error => {
            console.error('Fehler beim Senden des Feedbacks', error);
          }
        );
      } else {
        // Wenn kein Benutzer angemeldet ist, warnen und zur Login-Seite umleiten.
        console.warn('Kein Benutzer angemeldet oder Benutzer-ID nicht verfügbar. Feedback kann nicht gesendet werden.');
        this.goToLogin();
      }
    });
  }

  /**
   * @method goToLogin
   * @description Navigiert den Benutzer zur Login-Seite.
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
