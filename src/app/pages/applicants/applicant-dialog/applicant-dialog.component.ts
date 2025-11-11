import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

export interface Applicant {
  id?: string;
  name: string;
  email: string;
  appliedRole: string;
  experience: string;
  contact: string;
  resume: string;
  status?: 'New' | 'Shortlisted' | 'Rejected';
}

@Component({
  selector: 'app-applicant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './applicant-dialog.component.html',
  styleUrls: ['./applicant-dialog.component.scss']
})
export class ApplicantDialogComponent {
  applicant: Applicant;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<ApplicantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Applicant | null
  ) {
    this.isEditMode = !!data;

    this.applicant = data
      ? { ...data }
      : {
          name: '',
          email: '',
          appliedRole: '',
          experience: '',
          contact: '',
          resume: '',
          status: 'New'
        };
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave(form: NgForm) {
    if (form.invalid) return;
    this.dialogRef.close(this.applicant);
  }
}
