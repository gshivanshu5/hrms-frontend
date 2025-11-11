import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent implements OnInit {
  email = 'admin@example.com';
  password = 'Admin@123';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // ✅ If already logged in, redirect to dashboard
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  submit(): void {
    if (!this.email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.loading = false;

        // ✅ Persist session
        this.auth.setSession(res.token, res.user);

        // ✅ Navigate to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Invalid email or password.';
      }
    });
  }
}
