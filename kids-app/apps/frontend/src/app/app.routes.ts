import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/startPage/startPage.component';
import { EventsPageComponent } from './pages/eventsPage/eventsPage.component';
import { CommunityPageComponent } from './pages/communityPage/communityPage.component';
import { EventComponent } from './event/event.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'startseite',
        pathMatch: 'full',
    },
    {
        path: 'startseite',
        component: StartPageComponent
    },
    {
        path: 'angebote',
        component: EventsPageComponent
    },
    {
        path: 'angebote/:uuid',
        component: EventComponent
    },
    {
        path: 'community',
        component: CommunityPageComponent
    },
    {
        path: '**',
        redirectTo: 'startseite',
        pathMatch: 'full',
    },
];
