import { NgIf } from '@angular/common';
import { Component, inject, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  snackbar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy() {
    this.onSubmit();
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.snackbar.open('Login Successfull', 'Dismiss', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        this.snackbar.open('Login failed', 'Dismiss', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },

      complete: () => {
        this.loginForm.reset();
      },
    });
  }
}
