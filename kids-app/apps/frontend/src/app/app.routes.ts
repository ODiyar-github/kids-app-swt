import { Routes } from '@angular/router';
import { DashbardComponent } from './pages/dashboard/dashboard.component';
import { EventComponent } from './pages/event/event.component';
import { RoutingEnum } from './shared/enums/routing.enum';
import { LoginComponent } from './pages/login/login.component';
import { CommunityComponent } from './pages/community/communityPage.component';
import { ProfilePageComponent } from './pages/profil/profile.component';

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
    path: RoutingEnum.EVENT+'/:id',
    component: EventComponent,
  },
  {
    path: RoutingEnum.COMMUNITY,
    component: CommunityComponent,
  },
  {
    path: RoutingEnum.LOGIN,
    component: LoginComponent,
  },
  { 
    path: RoutingEnum.PROFILE, 
    component: ProfilePageComponent 
  }
];
