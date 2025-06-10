import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnChanges,
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
@Component({
  standalone: true,
  providers: [LoginService],
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
export class ToolbarComponent implements OnChanges {
  protected readonly RoutingEnum = RoutingEnum;
  
  isLoggedIn = false;

  constructor(private readonly loginService: LoginService, private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.isLoggedIn = this.loginService.getCurrentLoginStatus();
    this.cdr.detectChanges();
  }

  logout() {
    this.loginService.logout();
  }
}
