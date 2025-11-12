import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private base = 'https://hr-api-assess.onrender.com/api/dashboard';
  constructor(private http: HttpClient) {}
  getSummary(): Observable<any> {
    return this.http.get(`${this.base}/summary`);
  }
}
