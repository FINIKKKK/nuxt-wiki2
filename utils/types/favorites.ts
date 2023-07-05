import { TBase } from '~/utils/types/index';
import { TArticle } from '~/utils/types/article';

export interface TFavorite extends TBase {
  article_id: number;
  article: TArticle;
}

export interface TFavoriteData {
  external: any[];
  internal: [TFavorite[]];
}
