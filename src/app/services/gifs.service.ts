import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { GiphyMapper } from '../interfaces/giphy.mapper';
import { signal } from '@angular/core';
import { Gif } from '../interfaces/gif.interface';
import { GiphyResponse } from '../interfaces/giphy.interface';
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiUrl = environment.GiphyApiUrl;
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);
  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${this.apiUrl}/gifs/trending`, {
        params: {
          api_key: environment.GiphyApiKey,
          limit: 10,
        },
      })
      .subscribe((resp) => {
        const gifs = GiphyMapper.mapGifsToArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
      });
  }
}
