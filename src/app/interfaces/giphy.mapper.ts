import { GiphyItem, GiphyResponse } from './giphy.interface';
import { Gif } from './gif.interface';

export class GiphyMapper {
  static toGif(gif: GiphyItem): Gif {
    return {
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
    };
  }

  static mapGifsToArray(gifs: GiphyItem[]): Gif[] {
    return gifs.map(this.toGif);
  }
}
