import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GifGridComponent } from '../../components/gif-grid/gif-grid.component';
import { GifsService } from '../../../services/gifs.service';

@Component({
  selector: 'app-trending',
  imports: [GifGridComponent],
  templateUrl: './trending.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingComponent {
  trendingGifs = inject(GifsService).trendingGifs;
}
