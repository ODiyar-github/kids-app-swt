import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * @file main.ts
 * @description Dies ist der Einstiegspunkt der Angular-Anwendung.
 * Es initialisiert die Anwendung, indem es die Root-Komponente (`AppComponent`)
 * und die Anwendungskonfiguration (`appConfig`) bootstrappt.
 */

/**
 * Bootstrappt die Angular-Anwendung.
 * Verwendet `bootstrapApplication` für Standalone-Komponenten-basierte Anwendungen.
 * @param {Type<AppComponent>} AppComponent - Die Root-Komponente der Angular-Anwendung.
 * @param {ApplicationConfig} appConfig - Die Konfigurationseinstellungen für die Anwendung.
 * @returns {Promise<ApplicationRef>} Ein Promise, das mit einer Referenz auf die gebootstrappte Anwendung aufgelöst wird.
 * @throws {Error} Fängt Fehler ab, die während des Bootstrapping-Prozesses auftreten, und loggt sie in die Konsole.
 */
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  // Fängt Fehler ab, die während des Bootstrapping-Prozesses auftreten,
  // und gibt sie in der Konsole aus.
  console.error(err)
);
