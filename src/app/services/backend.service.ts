import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CharacterAnalysisInput } from "../models/CharacterAnalysisInput";
import { AnalysisResult } from "../models/AnalysisResult";
import { TvShowEntity } from "../models/TvShowEntity";

@Injectable({ providedIn: 'root' })
export class BackendService {
  backendURL = 'http://localhost:5034/api';

  constructor(private http: HttpClient) {}

  analyze(input: CharacterAnalysisInput) {
    return this.http.post<AnalysisResult>(
      `${this.backendURL}/reflection`,
      input
    );
  }

  getShows(){
    return this.http.get<TvShowEntity[]>(
      `${this.backendURL}/shows`
    );
  }
}