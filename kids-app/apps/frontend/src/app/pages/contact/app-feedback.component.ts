/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Neu: Für mat-select
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDTO } from '@kids-app/share'; // Dein UserDTO
import { AppFeedback, RatingEnum } from '@kids-app/share'; // Passe den Pfad an dein AppFeedback DTO an
import { FeedbackService } from '../../shared/services/app.feedback.service'; // Dein FeedbackService
import { LoginService } from '../../shared/services/login.service'; // Dein LoginService
import { take } from 'rxjs/operators';
import { MatCard } from "@angular/material/card"; // Neu: Für take-Operator
import { AppFeedbackEnum } from '@kids-app/share';

@Component({
  selector: 'app-app-feedback',
  templateUrl: './app-feedback.component.html',
  styleUrls: ['./app-feedback.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, // Hier hinzufügen
    ReactiveFormsModule,
],
  providers: [
    FeedbackService
  ],
})
export class AppFeedbackComponent implements OnInit {
  showForm = false;
  showConfirmation = false;
  feedbackForm: FormGroup;
  user$: Observable<UserDTO | undefined> | undefined;

  // Optionen für das Rating-Dropdown
  ratingOptions = [
    { value: AppFeedbackEnum.BugReport, viewValue: 'Fehler melden' },
    { value: AppFeedbackEnum.FeatureRequest, viewValue: 'Funktionswunsch' },
    { value: AppFeedbackEnum.GeneralFeedback, viewValue: 'Allgemeines Feedback' },
    { value: AppFeedbackEnum.PerformanceIssue, viewValue: 'Performance-Problem' },
    { value: AppFeedbackEnum.UIUXIssue, viewValue: 'Design/Usability-Problem' },
    { value: AppFeedbackEnum.Other, viewValue: 'Sonstiges' },
  ];

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly feedBackService: FeedbackService,
    private readonly userService: LoginService,
  ) {
    // Formulardefinition an AppFeedback DTO anpassen
    this.feedbackForm = this.fb.group({
      rating: ['', Validators.required], // Neues Feld für Rating
      comment: ['', Validators.required], // 'message' zu 'comment' geändert
    });
  }

  ngOnInit() {
    this.user$ = this.userService.currentUser$;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.feedbackForm.reset();
      // Standardwert für Rating setzen, falls gewünscht
      // this.feedbackForm.get('rating')?.setValue(RatingEnum.GOOD);
    }
  }

  closeForm() {
    this.showForm = false;
    this.feedbackForm.reset();
  }

  onSubmit() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      console.warn('Formular ist ungültig.');
      return;
    }

    this.user$?.pipe(take(1)).subscribe(user => {
      if (user && user.userId) {
        const formValues = this.feedbackForm.value;

        // --- HIER DIE ANPASSUNG: Verwende den AppFeedback-Konstruktor ---
        const feedbackToSend: AppFeedback = new AppFeedback(
          '', // feedbackId: Wird vom Backend generiert, hier leer lassen oder UUID.random().toString()
          user.userId,
          formValues.rating, // AppFeedbackEnum
          formValues.comment,
          new Date().toISOString() // Zeitstempel
        );

        console.log('Sende Feedback an Backend:', feedbackToSend);

        this.feedBackService.sendFeedBack(feedbackToSend).subscribe(
          response => {
            console.log('Feedback erfolgreich gesendet', response);
            this.showConfirmation = true;
            setTimeout(() => {
              this.showConfirmation = false;
            }, 5000);
            this.closeForm();
          },
          error => {
            console.error('Fehler beim Senden des Feedbacks', error);
          }
        );
      } else {
        console.warn('Kein Benutzer angemeldet oder Benutzer-ID nicht verfügbar. Feedback kann nicht gesendet werden.');
        this.goToLogin();
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}