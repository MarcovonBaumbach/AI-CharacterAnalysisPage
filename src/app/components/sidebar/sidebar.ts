import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TvShowEntity } from '../../models/TvShowEntity';
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { AnalysisStateService } from '../../services/analysis-state.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from './delete-dialog/delete-dialog';
import { ShowStateService } from '../../services/show-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  shows$ = new Observable<TvShowEntity[]>;

  constructor(
    private backendService: BackendService,
    private analysisStateService: AnalysisStateService,
    public showStateService: ShowStateService,
    private dialog: MatDialog
  ) {
    this.shows$ = this.showStateService.shows$;
  }

  setShowName(showName: string) {
    this.analysisStateService.showNameSubject.next(showName);
  }

  openDeleteDialog(show: TvShowEntity) {
    let dialogRef;
    dialogRef = this.dialog.open(DeleteDialog, {
      data: { show }
    });

    dialogRef.afterClosed().subscribe((deleted) => {
      if (deleted) {
        this.showStateService.refreshShows();
      }
    });
  }
}
