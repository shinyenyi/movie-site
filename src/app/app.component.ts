import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieData, Movie, BookMarkedMovie } from './app-request-response';
import { AppService } from './app.service';
import { debounce } from 'lodash';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'movie-site';

  searchText: string = "";
  id: string = "";
  movieData: MovieData | undefined;
  bookMarkedMovie: BookMarkedMovie | undefined;
  bookMarkedMovies: BookMarkedMovie[] = [];
  movies: Movie[] = [];
  bookMarkedMovieIds: string[] = [];
  subscription: Subscription = new Subscription;
  subscription1: Subscription = new Subscription;
  positions = NbGlobalPhysicalPosition;
  searchDisplay: boolean = true;
  viewAllDisplay: boolean = false;
  bookMarkedDisplay: boolean = false;
  errorMessage: string = "";

  constructor(private appService: AppService, private toastrService: NbToastrService) {

    this.searchForMovie = debounce(this.searchForMovie, 1000);
  }

  ngOnInit(): void {

    this.bookMarkedMovieIds = Array.from(JSON.parse(localStorage.getItem("bookMarkedMovieIds") || '[]'));
    console.log(this.bookMarkedMovieIds);
  }

  searchForMovie(searchText: string) {

    if (searchText === "") {
      return;
    }

    this.subscription = this.appService.getMovieData(searchText)
      .subscribe(
        data => {
          this.movieData = data,
            this.movies = data.results;
        },
        (error: Error) => { },
        () => {
          this.setBookMarkedMovies();

          // if (this.movieData?.response.errorMessage === undefined ? '' : this.movieData?.response.errorMessage !== null) {
          //   this.errorMessage = this.movieData?.response.errorMessage === undefined ? '' : this.movieData?.response.errorMessage;
          //   this.showToast(3000, this.positions.TOP_RIGHT);
          // }
        }
      );
  }

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

  removeFromBookMark(id: string | undefined, bookMarked: boolean | undefined) {

    const bookMarkedMovie = this.bookMarkedMovies.find(o => o.id === id);
    const bookMarkedMovieIndex: number = this.bookMarkedMovies.indexOf(bookMarkedMovie === undefined ? {} : bookMarkedMovie);
    this.bookMarkedMovies.splice(bookMarkedMovieIndex, 1);

    const movie = this.movieData?.results.find(o => o.id === id);
    Object.assign(movie, { bookMarked: false });

    const idIndex: number = this.bookMarkedMovieIds.indexOf(id === undefined ? '' : id);
    this.bookMarkedMovieIds.splice(idIndex, 1);

    localStorage.setItem("bookMarkedMovieIds", JSON.stringify(this.bookMarkedMovieIds));
    console.log(this.bookMarkedMovieIds);
  }

  bookMark(id: string, bookMarked: boolean) {

    const movie = this.movieData?.results.find(o => o.id === id);
    if (bookMarked) {
      Object.assign(movie, { bookMarked: false });
    } else {
      Object.assign(movie, { bookMarked: true });
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

  viewAll() {
    this.searchDisplay = false;
    this.viewAllDisplay = true;
    this.bookMarkedDisplay = false;
  }

  viewAllBookMarked() {
    this.bookMarkedMovies=[];

    if (this.bookMarkedMovieIds.length === 0) {
      this.errorMessage = 'NO Movies Found';
      this.showToast(3000, this.positions.TOP_RIGHT);
      return;
    }

    for (const id of this.bookMarkedMovieIds) {
      this.subscription1 = this.appService.getBookMarkedMovieData(id)
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

    this.searchDisplay = false;
    this.viewAllDisplay = false;
    this.bookMarkedDisplay = true;
    console.log(this.bookMarkedMovieIds);
  }

  addBookMarkedMovieToArray(bookMarkedMovie: BookMarkedMovie | undefined) {
    Object.assign(bookMarkedMovie, { bookMarked: true });

    this.bookMarkedMovies.push(bookMarkedMovie === undefined ? {} : bookMarkedMovie);
  }

  back() {
    this.bookMarkedMovies = [];
    this.searchDisplay = true;
    this.viewAllDisplay = false;
    this.bookMarkedDisplay = false;
    console.log(this.bookMarkedMovieIds);
  }

  showToast(duration: number, position: NbGlobalPhysicalPosition) {
    this.toastrService.show(
      this.errorMessage,
      `Response Error Message`,
      { duration, position });
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }
}
