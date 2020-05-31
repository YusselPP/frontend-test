import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';
import { of } from 'rxjs';

import { GifSearchComponent } from './gif-search.component';
import { GiphyService } from '../services/giphy';
import { SharedModule } from '../shared/shared.module';

describe('GifSearchComponent', () => {
  let component: GifSearchComponent;
  let fixture: ComponentFixture<GifSearchComponent>;
  const results = {
    data: Array(9).fill({
      title: 'title',
      images: {
        fixed_width: {
          url: 'url'
        }
      }
    }),
    pagination: {
      total_count: 100,
      offset: 0,
      count: 9
    }
  };

  const giphyService = jasmine.createSpyObj('GiphyService', ['searchGifs']);
  const searchGifsSpy: jasmine.Spy = giphyService.searchGifs.and.returnValue(
    of(results)
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [GifSearchComponent],
      providers: [
        {
          provide: GiphyService,
          useValue: giphyService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GifSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchGifsSpy.calls.reset();
  });

  it('should call GiphyService.searchGifs on query changes', fakeAsync(() => {
    const searcQuery = 'wow';
    component.onQueryChange(searcQuery);

    tick(500); // flush debounceTime

    expect(searchGifsSpy).toHaveBeenCalledWith(searcQuery, 0);
  }));

  it('should call GiphyService.searchGifs on page changes', fakeAsync(() => {
    const page = 5;
    const offset = (page - 1) * component.pageSize;

    component.page = 5;
    component.onPageChange();

    tick(500); // flush debounceTime

    expect(searchGifsSpy).toHaveBeenCalledWith('', offset);
  }));

  it('images$ should be the expected', fakeAsync(() => {
    const searcQuery = 'wow';
    // change search query
    component.onQueryChange(searcQuery);

    component.images$.subscribe((galleryImages) => {
      expect(galleryImages).toEqual(
        results.data.map(({ title, images }) => ({
          title,
          url: images.fixed_width.url
        }))
      );
    });

    tick(500); // flush debounceTime
  }));

  it('totalCount$ should be the expected', fakeAsync(() => {
    const searcQuery = 'wow';
    // change search query
    component.onQueryChange(searcQuery);

    component.totalCount$.subscribe((totalCount) => {
      expect(totalCount).toBe(results.pagination.total_count);
    });

    tick(500); // flush debounceTime
  }));
});
