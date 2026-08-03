import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifGrid } from '../../components/gif-grid/gif-grid';

@Component({
  selector: 'app-trending',
  imports: [GifGrid],
  templateUrl: './trending.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Trending {
  protected readonly images = Array.from({ length: 12 }, (_, i) => ({
    url: `https://flowbite.s3.amazonaws.com/docs/gallery/square/image${i > 0 ? '-' + i : ''}.jpg`,
  }));
}
