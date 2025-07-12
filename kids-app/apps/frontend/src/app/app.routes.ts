import { Routes } from '@angular/router';
import { DashbardComponent } from './pages/dashboard/dashboard.component';
import { EventComponent } from './pages/event/event.component';
import { RoutingEnum } from './shared/enums/routing.enum';
import { LoginComponent } from './pages/login/login.component';
import { CommunityComponent } from './pages/community/communityPage.component';
import { ProfilePageComponent } from './pages/profil/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { AppFeedbackComponent } from './pages/contact/app-feedback.component';

/**
 * @constant routes
 * @description Definiert die Routing-Konfiguration für die Angular-Anwendung.
 * Dieses Array von Routenobjekten ordnet URL-Pfade bestimmten Komponenten zu
 * und steuert die Navigation innerhalb der Anwendung.
 *
 * @type {Routes}
 */
export const routes: Routes = [
  /**
   * @description Standard-Umleitung für den Root-Pfad.
   * Wenn die Anwendung ohne spezifischen Pfad aufgerufen wird, wird auf das Dashboard umgeleitet.
   * @property {string} path - Der zu matchende Pfad (hier: Root-Pfad).
   * @property {string} redirectTo - Der Pfad, zu dem umgeleitet werden soll (Dashboard).
   * @property {string} pathMatch - Gibt an, wie der Pfad abgeglichen werden soll ('full' bedeutet exakter Abgleich).
   */
  {
    path: '',
    redirectTo: RoutingEnum.DASHBOARD,
    pathMatch: 'full',
  },
  /**
   * @description Route für das Dashboard.
   * Zeigt die Hauptübersicht der Anwendung an.
   * @property {string} path - Der Pfad für das Dashboard, definiert im RoutingEnum.
   * @property {Type<DashbardComponent>} component - Die Komponente, die für diese Route geladen wird.
   */
  {
    path: RoutingEnum.DASHBOARD,
    component: DashbardComponent,
  },
  /**
   * @description Route für die Event-Detailansicht.
   * Erlaubt das Anzeigen spezifischer Event-Details basierend auf einer ID im Pfad.
   * @property {string} path - Der Pfad für ein Event, inklusive eines dynamischen Parameters `:id`.
   * @property {Type<EventComponent>} component - Die Komponente, die für diese Route geladen wird.
   */
  {
    path: RoutingEnum.EVENT + '/:id',
    component: EventComponent,
  },
  /**
   * @description Route für die Community-Seite.
   * Zeigt Inhalte im Zusammenhang mit der Community der Anwendung an.
   * @property {string} path - Der Pfad für die Community-Seite, definiert im RoutingEnum.
   * @property {Type<CommunityComponent>} component - Die Komponente, die für diese Route geladen wird.
   */
  {
    path: RoutingEnum.COMMUNITY,
    component: CommunityComponent,
  },
  /**
   * @description Route für die Anmeldeseite.
   * Ermöglicht Benutzern die Anmeldung bei der Anwendung.
   * @property {string} path - Der Pfad für die Anmeldeseite, definiert im RoutingEnum.
   * @property {Type<LoginComponent>} component - Die Komponente, die für diese Route geladen wird.
   */
  {
    path: RoutingEnum.LOGIN,
    component: LoginComponent,
  },
  /**
   * @description Route für die Profilseite des Benutzers.
   * Zeigt die persönlichen Informationen und Einstellungen des angemeldeten Benutzers an.
   * @property {string} path - Der Pfad für die Profilseite, definiert im RoutingEnum.
   * @property {Type<ProfilePageComponent>} component - Die Komponente, die für diese Route geladen wird.
   */
  {
    path: RoutingEnum.PROFILE,
    component: ProfilePageComponent
  },
  /**
   * @description Route für die "Über uns"-Seite.
   * Enthält Informationen über die Anwendung oder das Unternehmen.
   * @property {string} path - Der Pfad für die "Über uns"-Seite, definiert im RoutingEnum.
   * @property {Type<AboutComponent>} component - Die Komponente, die für diese Route geladen wird.
   */
  {
    path: RoutingEnum.ABOUT,
    component: AboutComponent
  },
  /**
   * @description Route für die Kontakt- und Feedback-Seite.
   * Ermöglicht Benutzern, Feedback zu geben oder Kontakt aufzunehmen.
   * @property {string} path - Der Pfad für die Kontaktseite, definiert im RoutingEnum.
   * @property {Type<AppFeedbackComponent>} component - Die Komponente, die für diese Route geladen wird.
   */
  {
    path: RoutingEnum.CONTACT,
    component: AppFeedbackComponent
  },
];
