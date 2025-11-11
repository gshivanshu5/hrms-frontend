import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/**
 * Shape of an employee record.
 * - This matches what we're sending to backend /api/employees
 */
export interface Employee {
  id?: string;
  name: string;
  email: string;
  position?: string;    // ✅ changed from role
  department?: string;
  status?: string;
}


/**
 * Data passed into the dialog.
 * If `data` is provided -> Edit mode.
 * If `data` is null/undefined -> Add mode.
 */
export interface EmployeeDialogData extends Employee { }

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent {
  // This object is bound to the form inputs ([(ngModel)])
  employee: Employee;

  // Used to show dynamic title/button text
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData | null
  ) {
    this.isEditMode = !!data;

    // If editing, clone the incoming data.
    // If adding new, start with empty defaults.
    this.employee = data
      ? { ...data }
      : {
        name: '',
        email: '',
        position: '',
        department: '',
        status: 'active'
      };
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave(form: NgForm) {
    if (form.invalid) return;
    this.dialogRef.close(this.employee);
  }
}
