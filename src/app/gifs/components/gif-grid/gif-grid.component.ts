import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Gif } from '../../../interfaces/gif.interface';

@Component({
  selector: 'gif-grid',
  imports: [],
  templateUrl: './gif-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifGridComponent {
  gifs = input.required<Gif[]>();
}
