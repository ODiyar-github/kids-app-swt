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
    FormsModule
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
    console.log(this.redirectUrl);
  }

  async login(): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.loginService.login(this.username, this.password)
      );

      console.log('Login erfolgreich:', user);

      this.router.navigate(['/', this.redirectUrl]);
    } catch (err: any) {
      console.error('Login-Fehler:', err);
      this.errorMsg = err.message || 'Unbekannter Fehler beim Login';
    }
  }
}