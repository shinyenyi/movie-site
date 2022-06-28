import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieData } from './search-movie-request-response';

@Injectable({
  providedIn: 'root'
})
export class SearchMovieService {

  API_MOVIE_DATA_URL = "https://imdb-api.com/API/AdvancedSearch/k_3fpg0bzj?title=";

  constructor(private http: HttpClient) { }

  // fetches all searched movies
  getMovieData(searchText: string): Observable<MovieData> {
    return this.http.get<MovieData>(this.API_MOVIE_DATA_URL + searchText);
  }
}
