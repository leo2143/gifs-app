import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface GifImage {
  url: string;
  alt?: string;
}

@Component({
  selector: 'gif-grid',
  imports: [],
  templateUrl: './gif-grid.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifGrid {
  images = input.required<GifImage[]>();
}
