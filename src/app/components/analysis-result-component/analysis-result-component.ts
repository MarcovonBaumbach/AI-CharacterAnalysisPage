import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnalysisStateService } from '../../services/analysis-state.service';
import { AnalysisResult } from '../../models/AnalysisResult';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-analysis-result-component',
  imports: [MatCardModule, CommonModule],
  templateUrl: './analysis-result-component.html',
  styleUrl: './analysis-result-component.scss',
})
export class AnalysisResultComponent {
  result$: Observable<AnalysisResult | null>;

  constructor(private state: AnalysisStateService) {
    this.result$ = this.state.result$;
  }
}
