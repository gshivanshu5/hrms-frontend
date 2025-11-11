import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // ✅ First, try to restore session if not already loaded
    this.auth.restoreSession();

    const token = this.auth.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
