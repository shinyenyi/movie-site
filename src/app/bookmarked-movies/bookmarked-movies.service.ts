import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookMarkedMovie } from './bookmarked-movies-request-response';

@Injectable({
  providedIn: 'root'
})
export class BookmarkedMoviesService {

  API_BOOKMARKED_MOVIE_DATA_URL = "https://imdb-api.com/en/API/Title/k_3fpg0bzj/";

  constructor(private http: HttpClient) { }

  // fetches all bookmaked movies
  getBookMarkedMovieData(id: string): Observable<BookMarkedMovie> {
    return this.http.get<BookMarkedMovie>(this.API_BOOKMARKED_MOVIE_DATA_URL + id);
  }
}
