import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,],
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private loginService: LoginService,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  
    onSubmit() {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        const user = this.loginService.login(username, password).subscribe( (user)=>{
            return user;
        });
        if(user){
            console.log(user)
        }
      } else {
        this.loginForm.markAllAsTouched();
      }
    }
}
