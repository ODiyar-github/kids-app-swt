/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../shared/services/login.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { firstValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMsg = '';
  routingEnum = RoutingEnum;
  redirectUrl = '';
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirect'] || '/';
    });
  }
  
  async login(): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.loginService.login(this.username, this.password)
      );
  
      console.log('Login erfolgreich:', user);
  
      this.router.navigateByUrl(this.redirectUrl);
      window.scrollTo({top:0});
      console.log(this.redirectUrl);
    } catch (err: any) {
      console.error('Login-Fehler:', err);
      this.errorMsg = err.message || 'Unbekannter Fehler beim Login';
    }
  }
}