import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalysisFormComponent } from "./components/analysis-form-component/analysis-form-component";
import { AnalysisResultComponent } from './components/analysis-result-component/analysis-result-component';
import { Sidebar } from "./components/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AnalysisFormComponent,
    AnalysisResultComponent,
    Sidebar
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AI-CharacterAnalysisPage');
}
