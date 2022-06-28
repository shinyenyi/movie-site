import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'movie-site';

  constructor(private router: Router) { }

  ngOnInit(): void { }


  // takes you to bookmark UI
  viewAllBookMarked() {
    this.router.navigate(['/search/bookmarked']);
  }

  // returns to previous page
  back() {
    this.router.navigate(['/search']);
  }
}
