import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeesService } from '../../core/services/employees.service';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
export class EmployeesPageComponent implements OnInit {
  loading = false;
  error = '';
  rows: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'department', 'status', 'actions'];

  constructor(
    private empService: EmployeesService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.empService.list().subscribe({
      next: (res: any) => {
        this.rows = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.empService.create(result).subscribe({
          next: () => {
            this.snack.open('Employee added successfully!', 'Close', { duration: 2500 });
            this.loadEmployees();
          },
          error: () => {
            this.snack.open('Failed to add employee', 'Close', { duration: 2500 });
          }
        });
      }
    });
  }

  openEditDialog(emp: any) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: emp
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.empService.update(emp.id, result).subscribe({
          next: () => {
            this.snack.open('Employee updated successfully!', 'Close', { duration: 2500 });
            this.loadEmployees();
          },
          error: () => {
            this.snack.open('Failed to update employee', 'Close', { duration: 2500 });
          }
        });
      }
    });
  }

  deleteEmployee(emp: any) {
    if (confirm(`Are you sure you want to delete ${emp.name}?`)) {
      this.empService.delete(emp.id).subscribe({
        next: () => {
          this.snack.open('Employee deleted successfully', 'Close', { duration: 2500 });
          this.loadEmployees();
        },
        error: () => {
          this.snack.open('Failed to delete employee', 'Close', { duration: 2500 });
        }
      });
    }
  }
}
