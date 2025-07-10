/* eslint-disable @angular-eslint/prefer-inject */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { RoutingEnum } from '../shared/enums/routing.enum';
import { FooterComponent } from "./footerLayout/footer.component";
import { LoginService } from '../shared/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '@kids-app/share';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatSidenavContainer,
    MatSidenavContent,
    FooterComponent,
    HttpClientModule,
],
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  protected readonly RoutingEnum = RoutingEnum;

  user$: Observable<UserDTO | undefined>;

  constructor(public readonly loginService: LoginService) {
    this.user$ = this.loginService.currentUser$;
  }

  logout(): void {
    this.loginService.logout();
  }
}
