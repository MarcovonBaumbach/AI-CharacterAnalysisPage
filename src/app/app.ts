import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalysisFormComponent } from "./analysis-form-component/analysis-form-component";
import { AnalysisResultComponent } from './analysis-result-component/analysis-result-component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AnalysisFormComponent,
    AnalysisResultComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AI-CharacterAnalysisPage');
}
