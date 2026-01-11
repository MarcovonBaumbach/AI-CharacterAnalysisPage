import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { EpisodeEntity } from "../models/EpisodesEntity";

@Injectable({ providedIn: 'root' })
export class EpisodeStateService {
  private resultSubject = new BehaviorSubject<EpisodeEntity[] | null>(null);
  result$ = this.resultSubject.asObservable();

  setResult(result: EpisodeEntity[] | null) {
    this.resultSubject.next(result);
  }

  clear() {
    this.resultSubject.next(null);
  }
}