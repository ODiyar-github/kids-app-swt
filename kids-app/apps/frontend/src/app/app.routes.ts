import { Routes } from '@angular/router';
import { DashbardComponent } from './pages/dashboard/dashboard.component';
import { CommunityPageComponent } from './pages/community/communityPage.component';
import { EventComponent } from './pages/event/event.component';
import { RoutingEnum } from './shared/enums/routing.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutingEnum.HOME,
    pathMatch: 'full',
  },
  {
    path: RoutingEnum.DASHBOARD,
    component: DashbardComponent,
  },
  {
    path: RoutingEnum.events + '/:eventId',
    component: EventComponent,
  },
  {
    path: RoutingEnum.COMMUNITY,
    component: CommunityPageComponent,
  },
];
