import { Component } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { TvShowEntity } from '../../models/TvShowEntity';
import { CommonModule } from '@angular/common';
import { AnalysisStateService } from '../../services/analysis-state.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from './delete-dialog/delete-dialog';
import { ShowStateService } from '../../services/show-state.service';
import { BackendService } from '../../services/backend.service';
import { EpisodeStateService } from '../../services/episode-state.service';

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
    private episodeStateService: EpisodeStateService,
    private analysisStateService: AnalysisStateService,
    public showStateService: ShowStateService,
    private dialog: MatDialog
  ) {
    this.shows$ = this.showStateService.shows$;
  }

  setShowData(show: TvShowEntity) {
    this.analysisStateService.setResult(null);
    this.analysisStateService.showNameSubject.next(show.name);
    this.backendService.getEpisodes(show.id).subscribe(data => {
      this.episodeStateService.setResult(data);
    });
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
