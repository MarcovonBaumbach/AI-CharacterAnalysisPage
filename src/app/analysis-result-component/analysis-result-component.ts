import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AnalysisStateService } from '../services/analysis-state.service';
import { AnalysisResult } from '../Interfaces/AnalysisResult';

@Component({
  selector: 'app-analysis-result-component',
  imports: [NgIf, CommonModule, MatCardModule],
  templateUrl: './analysis-result-component.html',
  styleUrl: './analysis-result-component.scss',
})
export class AnalysisResultComponent {
  result: AnalysisResult | null = null;

  constructor(private state: AnalysisStateService) {
    this.state.result$.subscribe(data => {
      this.result = data;
    });
  }
}
