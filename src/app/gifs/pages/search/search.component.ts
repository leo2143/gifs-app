import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';
import { GifGridComponent } from '../../components/gif-grid/gif-grid.component';
import { GifsService } from '../../../services/gifs.service';
import { Gif } from '../../../interfaces/gif.interface';
import { GiphyMapper } from '../../../interfaces/giphy.mapper';

@Component({
  selector: 'app-search',
  imports: [GifGridComponent],
  templateUrl: './search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  
  gifsService = inject(GifsService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifsService.searchGifs(query).subscribe(resp =>{
      this.gifs.set(GiphyMapper.mapGifsToArray(resp.data));
    })

  }
  
}
