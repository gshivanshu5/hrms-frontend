import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:4000/api/auth';
  private tokenKey = 'hrms_token';
  private userKey = 'hrms_user';
  user: any = null;

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  /** ✅ Safe getter for browser environment */
  private get isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  logout() {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.user = null;
  }

  setSession(token: string, user: any) {
    if (!this.isBrowser) return;
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.user = user;
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.tokenKey);
  }

  /** ✅ Fix: only access localStorage in browser */
  restoreSession() {
    if (!this.isBrowser) return;
    const token = localStorage.getItem(this.tokenKey);
    const user = localStorage.getItem(this.userKey);
    if (token && user) {
      this.user = JSON.parse(user);
    }
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  getUser() {
    if (!this.user) this.restoreSession();
    return this.user;
  }
}
