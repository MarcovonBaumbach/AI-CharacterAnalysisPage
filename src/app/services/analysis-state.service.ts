import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AnalysisResult } from "../models/AnalysisResult";

@Injectable({ providedIn: 'root' })
export class AnalysisStateService {
  private resultSubject = new BehaviorSubject<AnalysisResult | null>(null);
  result$ = this.resultSubject.asObservable();
  showNameSubject = new BehaviorSubject<string>("");
  showName$ = this.showNameSubject.asObservable();

  setResult(result: AnalysisResult) {
    this.resultSubject.next(result);
  }

  clear() {
    this.resultSubject.next(null);
  }
}