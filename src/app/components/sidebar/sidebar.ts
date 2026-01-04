import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TvShowEntity } from '../../models/TvShowEntity';
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  shows$ = new Observable<TvShowEntity[]>;

  constructor (private backendService: BackendService) {
    this.shows$ = this.backendService.getShows();
  }
}
