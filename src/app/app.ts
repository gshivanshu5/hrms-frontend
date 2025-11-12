// src/app/app.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  user: any = null;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  toggleSidenav(): void {
    if (this.auth.isLoggedIn()) {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  canAccessDashboard(): boolean {
    return ['superadmin', 'hr', 'user'].includes(this.user?.role);
  }

  canAccessEmployees(): boolean {
    return ['superadmin', 'hr'].includes(this.user?.role);
  }

  canAccessApplicants(): boolean {
    return ['superadmin', 'hr'].includes(this.user?.role);
  }
}
