import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AnalysisResult } from '../../models/AnalysisResult';
import { AnalysisStateService } from '../../services/analysis-state.service';
import { ShowStateService } from '../../services/show-state.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-analysis-form-component',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './analysis-form-component.html',
  styleUrl: './analysis-form-component.scss',
})
export class AnalysisFormComponent {
  form!: FormGroup;
  loading = false;
  result: AnalysisResult | null = null;

  constructor(
    public backendService: BackendService,
    private fb: FormBuilder,
    private analysisState: AnalysisStateService,
    private showState: ShowStateService
  ) {
    this.analysisState.showName$.subscribe(value => {
      this.form = this.fb.group({
        showName: [value, Validators.required],
        episode: [''],
        observations: ['', Validators.required],
      });
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.analysisState.clear();

    this.backendService.analyze(this.form.value)
      .subscribe({
        next: (result: AnalysisResult) => {
          this.analysisState.setResult(result);
          this.showState.refreshShows();
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }
}
