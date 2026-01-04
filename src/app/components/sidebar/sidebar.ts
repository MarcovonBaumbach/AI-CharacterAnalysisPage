import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TvShowEntity } from '../../models/TvShowEntity';
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { AnalysisStateService } from '../../services/analysis-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  shows$ = new Observable<TvShowEntity[]>;

  constructor (
    private backendService: BackendService,
    private analysisStateService: AnalysisStateService
  ) {
    this.shows$ = this.backendService.getShows();

  }

  setShowName(showName: string){
    this.analysisStateService.showNameSubject.next(showName);
  }
}
