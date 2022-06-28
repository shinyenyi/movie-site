import { TestBed } from '@angular/core/testing';

import { BookmarkedMoviesService } from './bookmarked-movies.service';

describe('BookmarkedMoviesService', () => {
  let service: BookmarkedMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkedMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
