import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  map,
  pluck,
  share,
  switchMap,
  debounceTime,
  filter
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

  private query$ = new BehaviorSubject('');

  constructor(giphyService: GiphyService) {
    const searchResult$ = this.query$.pipe(
      debounceTime(1000),
      filter((query) => !!query),
      switchMap((query) => giphyService.searchGifs(query)),
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
    this.query$.next(query);
  }
}
