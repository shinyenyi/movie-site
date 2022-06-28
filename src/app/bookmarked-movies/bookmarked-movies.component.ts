import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieData } from '../search-movie/search-movie-request-response';
import { BookMarkedMovie } from './bookmarked-movies-request-response';
import { BookmarkedMoviesService } from './bookmarked-movies.service';
import { SearchMovieComponent } from '../search-movie/search-movie.component';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-bookmarked-movies',
  templateUrl: './bookmarked-movies.component.html',
  styleUrls: ['./bookmarked-movies.component.scss']
})
export class BookmarkedMoviesComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(SearchMovieComponent)
  searchMovieComponent: SearchMovieComponent | undefined;

  searchText: string = "";
  id: string = "";
  bookMarkedMovie: BookMarkedMovie | undefined;
  movieData: MovieData | undefined;
  bookMarkedMovies: BookMarkedMovie[] = [];
  bookMarkedMovieIds: string[] = [];
  subscription: Subscription = new Subscription;
  positions = NbGlobalPhysicalPosition;
  errorMessage: string = "";

  constructor(private bookmarkedMoviesService: BookmarkedMoviesService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.bookMarkedMovieIds = Array.from(JSON.parse(localStorage.getItem("bookMarkedMovieIds") || '[]'));
    this.viewAllBookMarked();
  }

  ngAfterViewInit() {
    this.movieData = this.searchMovieComponent?.movieData;
  }

  // removes bookmarked movie from search and bookmarked UI
  removeFromBookMark(id: string | undefined, bookMarked: boolean | undefined) {

    const bookMarkedMovie = this.bookMarkedMovies.find(o => o.id === id);
    const bookMarkedMovieIndex: number = this.bookMarkedMovies.indexOf(bookMarkedMovie === undefined ? {} : bookMarkedMovie);
    this.bookMarkedMovies.splice(bookMarkedMovieIndex, 1);

    const movie = this.movieData?.results.find(o => o.id === id);
    Object.assign(movie === undefined ? {} : movie, { bookMarked: false });

    const idIndex: number = this.bookMarkedMovieIds.indexOf(id === undefined ? '' : id);
    this.bookMarkedMovieIds.splice(idIndex, 1);

    localStorage.setItem("bookMarkedMovieIds", JSON.stringify(this.bookMarkedMovieIds));
    console.log(this.bookMarkedMovieIds);
  }

  // fetches bookmark UI data
  viewAllBookMarked() {
    this.bookMarkedMovies = [];

    if (this.bookMarkedMovieIds.length === 0) {
      this.errorMessage = 'NO Movies Found';
      this.showToast(3000, this.positions.TOP_RIGHT);
      return;
    }

    for (const id of this.bookMarkedMovieIds) {
      this.subscription = this.bookmarkedMoviesService.getBookMarkedMovieData(id)
        .subscribe(
          data => { this.bookMarkedMovie = data; },
          (error: Error) => { },
          () => {
            this.addBookMarkedMovieToArray(this.bookMarkedMovie);

            if (this.bookMarkedMovie?.errorMessage === undefined ? '' : this.bookMarkedMovie.errorMessage !== null) {
              this.errorMessage = this.bookMarkedMovie?.errorMessage === undefined ? '' : this.bookMarkedMovie.errorMessage;
              this.showToast(3000, this.positions.TOP_RIGHT);
            }
          }
        );
    }

    console.log(this.bookMarkedMovieIds);
  }

  // stores bookmarked movie's ID
  addBookMarkedMovieToArray(bookMarkedMovie: BookMarkedMovie | undefined) {
    Object.assign(bookMarkedMovie === undefined ? {} : bookMarkedMovie, { bookMarked: true });

    this.bookMarkedMovies.push(bookMarkedMovie === undefined ? {} : bookMarkedMovie);
  }

  // returns to previous page
  back() {
    this.bookMarkedMovies = [];
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
