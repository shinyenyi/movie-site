import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, 
  NbLayoutModule,
  NbInputModule,
  NbFormFieldModule,
  NbCardModule,
  NbButtonModule,
  NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import { BookmarkedMoviesComponent } from './bookmarked-movies/bookmarked-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchMovieComponent,
    BookmarkedMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbFormFieldModule,
    NbCardModule,
    FormsModule,
    HttpClientModule,
    NbButtonModule,
    NbToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
