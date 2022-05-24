import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieData, BookMarkedMovie } from './app-request-response';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_MOVIE_DATA_URL = "https://imdb-api.com/API/AdvancedSearch/k_3fpg0bzj?title=";
  API_BOOKMARKED_MOVIE_DATA_URL = "https://imdb-api.com/en/API/Title/k_3fpg0bzj/";

  constructor(private http: HttpClient) { }

  getMovieData(searchText: string): Observable<MovieData> {
    return this.http.get<MovieData>(this.API_MOVIE_DATA_URL + searchText);
  }

  getBookMarkedMovieData(id: string): Observable<BookMarkedMovie> {
    return this.http.get<BookMarkedMovie>(this.API_BOOKMARKED_MOVIE_DATA_URL + id);
  }

}
