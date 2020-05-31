import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {
  map,
  pluck,
  share,
  switchMap,
  debounceTime,
  tap,
  catchError,
  filter
} from 'rxjs/operators';

import { GiphyService, Gif, SearchResult } from '../services/giphy';
import { GalleryImage } from '../shared/image-gallery/interfaces';

@Component({
  selector: 'app-gif-search',
  templateUrl: './gif-search.component.html',
  styleUrls: ['./gif-search.component.sass']
})
export class GifSearchComponent implements OnInit {
  images$: Observable<GalleryImage[]>;
  totalCount$: Observable<number>;

  page = 1;
  pageSize = 9;
  loading = false;
  errorMessage: string;

  private params$ = new BehaviorSubject({ query: '', offset: 0 });

  constructor(giphyService: GiphyService) {
    const searchResult$: Observable<
      SearchResult | undefined
    > = this.params$.pipe(
      debounceTime(500),
      tap(() => {
        this.loading = true;
        this.errorMessage = '';
      }),
      switchMap(({ query, offset }) =>
        giphyService.searchGifs(query, offset).pipe(
          catchError(() => {
            this.errorMessage = 'Sorry something went wrong. Please try again.';
            return of(undefined);
          })
        )
      ),
      tap(() => (this.loading = false)),
      filter((results) => results !== undefined),
      share()
    );

    this.images$ = searchResult$.pipe(
      pluck('data'),
      map((data: Gif[]): GalleryImage[] =>
        data.map(({ title, images }) => ({
          title,
          url: images.fixed_width.url
        }))
      )
    );

    this.totalCount$ = searchResult$.pipe(pluck('pagination', 'total_count'));
  }

  ngOnInit(): void {}

  onQueryChange(query: string) {
    this.page = 1;
    this.params$.next({
      offset: 0,
      query
    });
  }

  onPageChange() {
    this.params$.next({
      ...this.params$.getValue(),
      offset: (this.page - 1) * this.pageSize
    });
  }
}
