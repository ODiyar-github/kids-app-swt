import { Routes } from '@angular/router';
import { DashbardComponent } from './pages/dashboard/dashboard.component';
import { CommunityPageComponent } from './pages/community/communityPage.component';
import { EventComponent } from './pages/event/event.component';
import { RoutingEnum } from './shared/enums/routing.enum';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutingEnum.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: RoutingEnum.DASHBOARD,
    component: DashbardComponent,
  },
  {
    path: RoutingEnum.EVENT,
    component: EventComponent,
  },
  {
    path: RoutingEnum.ORGANISATION,
    component: CommunityPageComponent,
  },
  {
    path: RoutingEnum.LOGIN,
    component: LoginComponent,
  }
];
