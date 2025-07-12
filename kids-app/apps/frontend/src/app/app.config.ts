import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';

import { routes } from './app.routes';

/**
 * @constant appConfig
 * @description Definiert die Hauptkonfiguration für die Angular-Anwendung.
 * Dieses Objekt konfiguriert die globalen Services und Provider, die für das
 * Funktionieren der Anwendung notwendig sind, wie Routing und HTTP-Client.
 *
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  /**
   * @property {Array<any>} providers - Ein Array von Providern, die global in der Anwendung verfügbar gemacht werden.
   * Jeder Provider stellt eine bestimmte Funktionalität oder einen Service bereit.
   */
  providers: [
    /**
     * @function provideRouter
     * @description Konfiguriert den Angular Router mit den definierten Routen.
     * Ermöglicht die Navigation zwischen verschiedenen Ansichten der Anwendung.
     * @param {Routes} routes - Das Array der Routen, das die Navigationspfade der Anwendung definiert.
     */
    provideRouter(routes),

    /**
     * @function provideHttpClient
     * @description Stellt den HttpClient-Service in der Anwendung bereit.
     * Ermöglicht das Senden und Empfangen von HTTP-Anfragen an Backend-APIs.
     */
    provideHttpClient(),

    /**
     * @description Konfiguriert den Angular Image-Service.
     * Hier werden spezifische Warnungen für die Bildoptimierung deaktiviert.
     * @property {InjectionToken<ImageConfig>} provide - Das Injection Token für die Bildkonfiguration.
     * @property {object} useValue - Das Konfigurationsobjekt für den Image-Service.
     * @property {boolean} useValue.disableImageSizeWarning - Deaktiviert Warnungen, wenn Bilder nicht optimal dimensioniert sind.
     * @property {boolean} useValue.disableImageLazyLoadWarning - Deaktiviert Warnungen bezüglich des Lazy Loadings von Bildern.
     */
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    }
  ],
};
