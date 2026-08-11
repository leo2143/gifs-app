import { computed, effect, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { GiphyMapper } from '../interfaces/giphy.mapper';
import { signal } from '@angular/core';
import { Gif } from '../interfaces/gif.interface';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = () => {
  const gifsFromsLocalStorage = localStorage.getItem('gifs') ?? '{}';
  const gifs = JSON.parse(gifsFromsLocalStorage);
  return gifs;
};
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiUrl = environment.GiphyApiUrl;
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);
  gifs = signal<Gif[]>([]);
  gifsLoading = signal<boolean>(false);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });

  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
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

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${this.apiUrl}/gifs/search`, {
        params: {
          api_key: environment.GiphyApiKey,
          q: query,
          limit: 25,
          offset: 0,
          rating: 'g',
          lang: 'en',
          bundle: 'messaging_non_clips',
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GiphyMapper.mapGifsToArray(items)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        }),
      );
  }
}
