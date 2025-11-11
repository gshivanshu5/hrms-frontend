// src/app/core/services/employees.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Employee interface that matches your backend structure */
export interface Employee {
  id?: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private baseUrl = 'http://localhost:4000/api/employees';

  constructor(private http: HttpClient) {}

  /** Fetch all employees */
  list(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  /** Create a new employee */
  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  /** Update an existing employee */
  update(id: string, employee: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }

  /** Delete an employee */
  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
