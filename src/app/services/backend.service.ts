import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CharacterAnalysisInput } from "../Interfaces/CharacterAnalysisInput";
import { AnalysisResult } from "../Interfaces/AnalysisResult";

@Injectable({ providedIn: 'root' })
export class BackendService {
  backendURL = 'http://localhost:5034';

  constructor(private http: HttpClient) {}

  analyze(input: CharacterAnalysisInput) {
    return this.http.post<AnalysisResult>(
      `${this.backendURL}/api/reflection`,
      input
    );
  }
}