/**
 * @file app.module.ts
 * @description Dies ist das Hauptmodul der NestJS-Anwendung.
 * Es importiert und konfiguriert andere Module, die für die Funktionalität der Anwendung benötigt werden,
 * wie das `ConfigModule` zur Verwaltung von Umgebungsvariablen und das `KidsAppModule`, das die Kernlogik enthält.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KidsAppModule } from './kidsApp/kidsApp.module';

/**
 * @class AppModule
 * @description Das Root-Modul der NestJS-Anwendung.
 * Es aggregiert andere Module und konfiguriert globale Einstellungen.
 */
@Module({
  /**
   * @property {Array<any>} imports - Eine Liste von Modulen, die in dieses Modul importiert werden.
   * Die in `imports` aufgeführten Module exportieren Provider, die von diesem Modul verwendet werden können.
   */
  imports: [
    /**
     * @module ConfigModule
     * @description Importiert und konfiguriert das `ConfigModule` von NestJS.
     * Es ermöglicht das Laden von Umgebungsvariablen aus `.env`-Dateien.
     * @param {object} options - Konfigurationsoptionen für das `ConfigModule`.
     * @property {boolean} options.isGlobal - Wenn `true`, wird das `ConfigModule` global verfügbar gemacht,
     * sodass seine Konfiguration in jedem anderen Modul injiziert werden kann, ohne es erneut importieren zu müssen.
     * @property {string} options.envFilePath - Der Pfad zur `.env`-Datei, aus der Umgebungsvariablen geladen werden sollen.
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    /**
     * @module KidsAppModule
     * @description Importiert das `KidsAppModule`, das die Hauptlogik und Features der Anwendung enthält.
     */
    KidsAppModule,
  ],
  // Die `controllers` und `providers` Eigenschaften sind hier leer,
  // da dieses Root-Modul hauptsächlich als Aggregator für andere Module dient.
  // Controller und Provider werden typischerweise in den importierten Feature-Modulen definiert.
})
export class AppModule {}
