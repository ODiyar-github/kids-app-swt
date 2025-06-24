import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserDTO, InterestEnum } from '@kids-app/share';
import { LoginService } from '../../shared/services/login.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingEnum } from '../../shared/enums/routing.enum';
import { Router } from '@angular/router';


@Component({
    standalone: true,
    selector: 'app-profile-page',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [
      CommonModule,
      FormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatProgressSpinnerModule,
    ]
  })
  export class ProfilePageComponent implements OnInit {
    routingEnum = RoutingEnum;
    currentUser!: UserDTO;
    editableUser: UserDTO | null = null;
    isLoading = true;
    interests = Object.values(InterestEnum);
  
    constructor(
      private readonly loginService: LoginService,
      private readonly router: Router
    ) {}
  
    ngOnInit(): void {
      const user = this.loginService.getCurrentUser();
  
      if (!user) {
        this.router.navigate(['/', this.routingEnum.LOGIN]);
        return;
      }
  
      this.currentUser = user;
      this.editableUser = { ...user };
      this.isLoading = false;
    }
  
    saveChanges(): void {
      if (!this.editableUser) return;
      this.currentUser = { ...this.editableUser };
    }
  }