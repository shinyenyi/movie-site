import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieData, Movie } from './search-movie-request-response';
import { SearchMovieService } from './search-movie.service';
import { debounce } from 'lodash';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit, OnDestroy {

  searchText: string = "";
  id: string = "";
  movieData: MovieData | undefined;
  movies: Movie[] = [];
  bookMarkedMovieIds: string[] = [];
  subscription: Subscription = new Subscription;
  positions = NbGlobalPhysicalPosition;
  errorMessage: string = "";

  constructor(private searchMovieService: SearchMovieService, private toastrService: NbToastrService) {
    this.searchForMovie = debounce(this.searchForMovie, 1000);
  }

  ngOnInit(): void {
    this.bookMarkedMovieIds = Array.from(JSON.parse(localStorage.getItem("bookMarkedMovieIds") || '[]'));
  }

  //Search for movies by search text 
  searchForMovie(searchText: string) {

    if (searchText === "") {
      return;
    }

    this.subscription = this.searchMovieService.getMovieData(searchText)
      .subscribe(
        data => {
          this.movieData = data,
            this.movies = data.results;
        },
        (error: Error) => { },
        () => {
          this.setBookMarkedMovies();

          if (this.movieData?.response.errorMessage === undefined ? '' : this.movieData.response.errorMessage !== null) {
            this.errorMessage = this.movieData?.response.errorMessage === undefined ? '' : this.movieData.response.errorMessage;
            this.showToast(3000, this.positions.TOP_RIGHT);
          }
        }
      );
  }

  // sets bookMarked movies as booked marked on search UI
  setBookMarkedMovies() {

    for (let i = 0; i < this.bookMarkedMovieIds.length; i++) {
      for (const movie of this.movieData?.results === undefined ? [] : this.movieData.results) {
        if (movie.id === this.bookMarkedMovieIds[i]) {
          movie.bookMarked = true;
        } else if (!movie.bookMarked) {
          movie.bookMarked = false;
        }
      }
    }
  }

  // removes bookmarked movie from search and bookmarked UI
  removeFromBookMark(id: string | undefined, bookMarked: boolean | undefined) {

    const movie = this.movieData?.results.find(o => o.id === id);
    Object.assign(movie === undefined ? {} : movie, { bookMarked: false });

    const idIndex: number = this.bookMarkedMovieIds.indexOf(id === undefined ? '' : id);
    this.bookMarkedMovieIds.splice(idIndex, 1);

    localStorage.setItem("bookMarkedMovieIds", JSON.stringify(this.bookMarkedMovieIds));
    console.log(this.bookMarkedMovieIds);
  }

  // bookmarks a movie on search UI 
  bookMark(id: string, bookMarked: boolean) {

    const movie = this.movieData?.results.find(o => o.id === id);
    if (bookMarked) {
      Object.assign(movie === undefined ? {} : movie, { bookMarked: false });
    } else {
      Object.assign(movie === undefined ? {} : movie, { bookMarked: true });
    }

    if (!this.bookMarkedMovieIds.includes(id)) {
      // Add item to array
      this.bookMarkedMovieIds.push(id);
    } else {
      // Remove item from array
      const idIndex: number = this.bookMarkedMovieIds.indexOf(id);
      this.bookMarkedMovieIds.splice(idIndex, 1);
    }

    localStorage.setItem("bookMarkedMovieIds", JSON.stringify(this.bookMarkedMovieIds));
    console.log(this.bookMarkedMovieIds);
  }

  // displays error messages
  showToast(duration: number, position: NbGlobalPhysicalPosition) {
    this.toastrService.show(
      this.errorMessage,
      `Response Error Message`,
      { duration, position });
  }

  // closes current subscription
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }
}
