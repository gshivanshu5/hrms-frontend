import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ApplicantsService, Applicant } from '../../core/services/applicants.service';
import { ApplicantDialogComponent } from './applicant-dialog/applicant-dialog.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-applicants-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './applicants-page.component.html',
  styleUrls: ['./applicants-page.component.scss']
})
export class ApplicantsPageComponent implements OnInit {
  applicants: Applicant[] = [];
  filteredApplicants: Applicant[] = [];
  loading = true;
  error = '';
  filterRole = 'All';
  filterStatus = 'All';
  userRole: string | null = null;

  constructor(
    private svc: ApplicantsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();
    this.userRole = user?.role || null;
    this.loadApplicants();
  }

  loadApplicants() {
    this.loading = true;
    this.svc.list().subscribe({
      next: (res) => {
        this.applicants = res;
        this.filteredApplicants = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load applicants';
        this.loading = false;
        this.showToast('❌ Failed to load applicants', true);
      }
    });
  }

  applyFilters() {
    this.filteredApplicants = this.applicants.filter(a => {
      const roleMatch = this.filterRole === 'All' || a.appliedRole === this.filterRole;
      const statusMatch = this.filterStatus === 'All' || a.status === this.filterStatus;
      return roleMatch && statusMatch;
    });
  }

  /** ✅ Add or Edit Dialog */
  openApplicantDialog(existing?: Applicant) {
    if (this.userRole !== 'hr' && this.userRole !== 'superadmin') {
      this.showToast('🚫 Only HR can add or edit applicants', true);
      return;
    }

    const dialogRef = this.dialog.open(ApplicantDialogComponent, {
      width: '420px',
      data: existing || null
    });

    dialogRef.afterClosed().subscribe((result: Applicant | null) => {
      if (result) {
        if (existing?.id) {
          // Edit mode
          this.svc.update(existing.id, result).subscribe({
            next: () => {
              this.showToast('✅ Applicant updated successfully');
              this.loadApplicants();
            },
            error: () => this.showToast('❌ Failed to update applicant', true)
          });
        } else {
          // Add mode
          this.svc.create(result).subscribe({
            next: () => {
              this.showToast('✅ Applicant added successfully');
              this.loadApplicants();
            },
            error: () => this.showToast('❌ Failed to add applicant', true)
          });
        }
      }
    });
  }

  /** ✅ Update applicant status */
  onStatusChange(applicant: Applicant, newStatus: Applicant['status']) {
    this.svc.update(applicant.id!, { status: newStatus }).subscribe({
      next: () => {
        applicant.status = newStatus;
        this.showToast(`✅ Status updated to ${newStatus}`);
      },
      error: () => this.showToast('❌ Failed to update status', true)
    });
  }

  /** ✅ Delete applicant (only superadmin) */
  deleteApplicant(applicant: Applicant) {
    if (this.userRole !== 'superadmin') {
      this.showToast('🚫 Only Super Admin can delete applicants', true);
      return;
    }

    if (confirm(`Are you sure you want to delete ${applicant.name}?`)) {
      this.svc.delete(applicant.id!).subscribe({
        next: () => {
          this.showToast('🗑️ Applicant deleted');
          this.loadApplicants();
        },
        error: () => this.showToast('❌ Failed to delete applicant', true)
      });
    }
  }

  showToast(message: string, isError = false) {
    this.snackbar.open(message, 'Close', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: isError ? ['snackbar-error'] : ['snackbar-success']
    });
  }
}
