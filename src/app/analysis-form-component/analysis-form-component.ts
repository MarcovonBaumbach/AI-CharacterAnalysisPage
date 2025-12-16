import { Component } from '@angular/core';
import { BackendService } from '../services/backend-service';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AnalysisResult } from '../Interfaces/AnalysisResult';

@Component({
  selector: 'app-analysis-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './analysis-form-component.html',
  styleUrl: './analysis-form-component.scss',
})
export class AnalysisFormComponent {
  form = new FormGroup<any>('');
  loading = false;
  result: AnalysisResult | null = null;

  constructor(public analysisService: BackendService, private fb: FormBuilder) {
    this.form = this.fb.group({
      show: [''],
      character: ['', Validators.required],
      context: [''],
      analysis: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.result = null;

    this.analysisService.analyze(this.form.value)
      .subscribe({
        next: result => {
          this.result = result;
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }
}
