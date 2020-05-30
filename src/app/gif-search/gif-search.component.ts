import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of, empty } from 'rxjs';
import {
  map,
  pluck,
  share,
  switchMap,
  debounceTime,
  tap
} from 'rxjs/operators';

import { GiphyService, Gif } from '../services/giphy';
import { GalleryImage } from '../shared/image-gallery/interfaces';

@Component({
  selector: 'app-gif-search',
  templateUrl: './gif-search.component.html',
  styleUrls: ['./gif-search.component.sass']
})
export class GifSearchComponent implements OnInit {
  images$: Observable<GalleryImage[]>;
  totalCount$: Observable<number>;

  params$ = new BehaviorSubject({ query: '', offset: 0 });
  loading = false;

  page = 1;
  pageSize = 9;

  constructor(giphyService: GiphyService) {
    const searchResult$ = this.params$.pipe(
      debounceTime(500),
      tap(() => (this.loading = true)),
      switchMap(({ query, offset }) => giphyService.searchGifs(query, offset)),
      tap(() => (this.loading = false)),
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
