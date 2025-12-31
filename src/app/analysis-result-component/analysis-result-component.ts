import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AnalysisStateService } from '../services/analysis-state.service';
import { AnalysisResult } from '../Interfaces/AnalysisResult';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-analysis-result-component',
  imports: [NgIf, CommonModule, MatCardModule],
  templateUrl: './analysis-result-component.html',
  styleUrl: './analysis-result-component.scss',
})
export class AnalysisResultComponent {
  result$: Observable<AnalysisResult | null>;

  constructor(private state: AnalysisStateService) {
    this.result$ = this.state.result$;
  }
}
