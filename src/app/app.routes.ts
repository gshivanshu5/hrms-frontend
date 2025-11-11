import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { EmployeesPageComponent } from './pages/employees/employees-page.component';
import { ApplicantsPageComponent } from './pages/applicants/applicants-page.component';
import { LoginPageComponent } from './pages/auth/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'employees', component: EmployeesPageComponent },
      { path: 'applicants', component: ApplicantsPageComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
