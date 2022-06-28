import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkedMoviesComponent } from './bookmarked-movies/bookmarked-movies.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'search', pathMatch: 'full'
  },
  {
    path: 'search',
    children: [
      {
        path: '',
        component: SearchMovieComponent
      },
      {
        path: 'bookmarked',
        component: BookmarkedMoviesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
