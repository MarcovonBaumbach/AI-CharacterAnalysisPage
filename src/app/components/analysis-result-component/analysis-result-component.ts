import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnalysisStateService } from '../../services/analysis-state.service';
import { AnalysisResult } from '../../models/AnalysisResult';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EpisodeStateService } from '../../services/episode-state.service';
import { EpisodeEntity } from '../../models/EpisodesEntity';

@Component({
  standalone: true,
  selector: 'app-analysis-result-component',
  imports: [MatCardModule, CommonModule],
  templateUrl: './analysis-result-component.html',
  styleUrl: './analysis-result-component.scss',
})
export class AnalysisResultComponent {
  analysis$: Observable<AnalysisResult | null>;
  episodes$: Observable<EpisodeEntity[] | null>;

  constructor(private analysisState: AnalysisStateService,
    private episodeState: EpisodeStateService
  ) {
    this.analysis$ = this.analysisState.result$;
    this.episodes$ = this.episodeState.result$;
  }
}
