/**
 * @file main.ts
 * @description Dies ist der Haupt-Einstiegspunkt für die NestJS-Anwendung (Backend/BFF).
 * Es initialisiert die Anwendung, konfiguriert CORS, setzt einen globalen Präfix für API-Endpunkte
 * und richtet Swagger (OpenAPI-Dokumentation) ein.
 */

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

/**
 * @async
 * @function bootstrap
 * @description Die asynchrone Funktion, die die NestJS-Anwendung startet und konfiguriert.
 * Sie führt folgende Schritte aus:
 * 1. Erstellt eine NestJS-Anwendungsinstanz.
 * 2. Aktiviert und konfiguriert CORS (Cross-Origin Resource Sharing).
 * 3. Setzt einen globalen Präfix für alle API-Endpunkte.
 * 4. Konfiguriert und initialisiert Swagger für die API-Dokumentation.
 * 5. Startet den HTTP-Server und lauscht auf dem konfigurierten Port.
 * 6. Loggt die Start-URLs der Anwendung und der Swagger-Dokumentation.
 */
async function bootstrap() {
  // Erstellt eine Instanz der NestJS-Anwendung unter Verwendung des AppModule.
  const app = await NestFactory.create(AppModule);

  // Aktiviert CORS (Cross-Origin Resource Sharing), um Anfragen von verschiedenen Ursprüngen zu erlauben.
  app.enableCors({
    // Definiert die erlaubten Ursprünge für CORS-Anfragen.
    // Hier sind localhost-URLs für Entwicklungsumgebungen aufgeführt.
    origin: ['http://localhost:8080', 'http://localhost:8080/', 'http://localhost:4200', 'http://localhost:4200/'],
    // Erlaubt die angegebenen HTTP-Methoden.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // Erlaubt das Senden von Cookies oder Authentifizierungs-Headern.
    credentials: true,
  });

  // Definiert einen globalen Präfix für alle API-Endpunkte.
  // Alle Routen werden unter diesem Präfix verfügbar sein (z.B. /api/users, /api/events).
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Erstellt eine neue Swagger-Dokumentationskonfiguration.
  const config = new DocumentBuilder()
    .setTitle('BFF API') // Setzt den Titel der API-Dokumentation.
    .setDescription('API Doku für das NestJS-BFF') // Setzt die Beschreibung der API.
    .setVersion('1.0') // Setzt die Version der API.
    .build(); // Baut das Konfigurationsobjekt.

  // Erstellt das Swagger-Dokument basierend auf der Anwendung und der Konfiguration.
  const document = SwaggerModule.createDocument(app, config);
  // Richtet den Swagger-UI-Endpunkt ein, unter dem die API-Dokumentation verfügbar sein wird.
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  // Bestimmt den Port, auf dem die Anwendung lauschen soll.
  // Verwendet die Umgebungsvariable PORT oder fällt auf 3000 zurück.
  const port = process.env.PORT || 3000;
  // Startet den HTTP-Server und lässt die Anwendung auf dem bestimmten Port lauschen.
  await app.listen(port);

  // Loggt die URL, unter der die Anwendung läuft.
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  // Loggt die URL, unter der die Swagger-Dokumentation verfügbar ist.
  Logger.log(`📚 Swagger Docs: http://localhost:${port}/${globalPrefix}/docs`);
}

// Ruft die Bootstrap-Funktion auf, um die Anwendung zu starten.
bootstrap();
