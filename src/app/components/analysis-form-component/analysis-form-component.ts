import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AnalysisResult } from '../../models/AnalysisResult';
import { AnalysisStateService } from '../../services/analysis-state.service';
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

  constructor(public analysisService: BackendService,
    private fb: FormBuilder,
    private state: AnalysisStateService) {
    this.form = this.fb.group({
      showName: ['', Validators.required],
      episode: [''],
      observations: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.state.clear();

    this.analysisService.analyze(this.form.value)
      .subscribe({
        next: (result: AnalysisResult) => {
          this.state.setResult(result);
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }
}
