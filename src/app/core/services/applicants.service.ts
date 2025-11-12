import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Applicant {
  id?: string;
  name: string;
  email: string;
  appliedRole: string;
  experience: string;
  contact: string;
  resume: string;
  status: 'New' | 'Shortlisted' | 'Rejected';
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ApplicantsService {
  private baseUrl = 'https://hr-api-assess.onrender.com/api/applicants';

  constructor(private http: HttpClient) {}

  /** Get all applicants */
  list(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(this.baseUrl);
  }

  /** Add a new applicant */
  create(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>(this.baseUrl, applicant);
  }

  /** Update an applicant */
  update(id: string, applicant: Partial<Applicant>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, applicant);
  }

  /** Delete an applicant (superadmin only) */
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
