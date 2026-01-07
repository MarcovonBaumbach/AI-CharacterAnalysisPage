import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { TvShowEntity } from '../../models/TvShowEntity';
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { AnalysisStateService } from '../../services/analysis-state.service';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  shows$ = new Observable<TvShowEntity[]>;
  errorMessage: string | null = null;

  constructor(
    private backendService: BackendService,
    private analysisStateService: AnalysisStateService
  ) {
    this.shows$ = this.backendService.getShows().pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = this.extractErrorMessage(error);
        return of([]);
      })
    );
  }

  setShowName(showName: string) {
    this.analysisStateService.showNameSubject.next(showName);
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    if (typeof error.error === 'string') {
      return `Server error: ` + error.error;
    }

    if (error.error?.message) {
      return `Server error: ` + error.error.message;
    }

    return `Server error ${error.status}: ${error.statusText}`;
  }
}
