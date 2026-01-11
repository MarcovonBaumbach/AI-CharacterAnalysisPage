import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { BackendService } from './backend.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ShowStateService {
  private refresh$ = new BehaviorSubject<void>(undefined);

  shows$ = this.refresh$.pipe(
    switchMap(() => this.backendService.getShows().pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = this.extractErrorMessage(error);
        return of([]);
      })
    ))
  );

  errorMessage: string | null = null;

  constructor(private backendService: BackendService) { }

  refreshShows() {
    this.refresh$.next();
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
