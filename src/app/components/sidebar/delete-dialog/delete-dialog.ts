import { Component, Inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TvShowEntity } from '../../../models/TvShowEntity';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    NgIf
  ],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog {
  isDeleting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {show: TvShowEntity}, 
    private dialogRef: MatDialogRef<DeleteDialog>,
    private backendService: BackendService,
    private snackBar: MatSnackBar
  ) { }

  confirmDelete(): void {
    this.isDeleting = true;

    this.backendService.deleteShow(this.data.show.id).subscribe({
      next: () => {
        this.snackBar.open('Show deleted successfully', 'Close', {
          duration: 5000
        });

        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isDeleting = false;
        this.dialogRef.close(true);
        this.snackBar.open(`Failed to delete show ${error.error}`, 'Close', {
          duration: 5000
        });
      }
    });
  }
}
