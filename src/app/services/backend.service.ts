import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CharacterAnalysisInput } from "../models/CharacterAnalysisInput";
import { AnalysisResult } from "../models/AnalysisResult";
import { TvShowEntity } from "../models/TvShowEntity";
import { EpisodeEntity } from "../models/EpisodesEntity";

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

  getEpisodes(showId: string){
    return this.http.get<EpisodeEntity[]>(
      `${this.backendURL}/shows/${showId}/episodes`
    );
  }

  deleteShow(showId: string) {
    return this.http.delete(
      `${this.backendURL}/shows/${showId}`
    );
  }
}