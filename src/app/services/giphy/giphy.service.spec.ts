import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { GiphyService } from './giphy.service';
import { SearchResult } from './interfaces';

describe('GiphyService', () => {
  let service: GiphyService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GiphyService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTesting.verify();
  });

  describe('search()', () => {
    let searchUrl: string;
    let testRequest: TestRequest;

    const searchResult: SearchResult = {
      data: [],
      pagination: {
        count: 0,
        offset: 0,
        total_count: 0
      }
    };

    beforeEach(() => {
      searchUrl = `${service.BaseUrl}/gifs/search`;
    });

    it('request should include the api_key', () => {
      service.searchGifs('cats').subscribe();

      testRequest = httpTesting.expectOne((req) =>
        req.url.startsWith(searchUrl)
      );

      expect(testRequest.request.params.get('api_key')).toBe(
        environment.giphyApiKey
      );

      testRequest.flush(searchResult);
    });

    it('request should include default search parameters', () => {
      service.searchGifs('cats').subscribe();

      testRequest = httpTesting.expectOne((req) =>
        req.url.startsWith(searchUrl)
      );

      expect(testRequest.request.params.get('offset')).toBe(`0`);
      expect(testRequest.request.params.get('limit')).toBe(`9`);

      testRequest.flush(searchResult);
    });

    it('request should include provided parameters', () => {
      const serachQuery = 'cats';
      const offset = 5;
      const limit = 20;

      service.searchGifs(serachQuery, offset, limit).subscribe();

      testRequest = httpTesting.expectOne((req) =>
        req.url.startsWith(searchUrl)
      );

      expect(testRequest.request.params.get('q')).toBe(serachQuery);
      expect(testRequest.request.params.get('offset')).toBe(`${offset}`);
      expect(testRequest.request.params.get('limit')).toBe(`${limit}`);

      testRequest.flush(searchResult);
    });

    it('request should return the expected search result', () => {
      service.searchGifs('cats').subscribe((result) => {
        expect(result).toEqual(searchResult);
      });

      testRequest = httpTesting.expectOne((req) =>
        req.url.startsWith(searchUrl)
      );

      testRequest.flush(searchResult);
    });
  });
});
