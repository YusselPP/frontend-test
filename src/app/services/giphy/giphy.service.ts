import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SearchResult } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  readonly BaseUrl = 'https://api.giphy.com/v1';
  private readonly KeyParam = new HttpParams({
    fromObject: { api_key: environment.giphyApiKey }
  });

  constructor(private http: HttpClient) {}

  searchGifs(query: string, offset = 0, limit = 9): Observable<SearchResult> {
    const params = this.KeyParam.append('q', query)
      .append('offset', `${offset}`)
      .append('limit', `${limit}`);

    return this.http.get<SearchResult>(`${this.BaseUrl}/gifs/search`, {
      params
    });
  }
}
