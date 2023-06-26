import { TBase } from '~/utils/types/index';
import { TSection } from '~/utils/types/secton';

export type ArticleDto = TBase & {
  team_id: string;
  name: string;
  tabs: string[];
  section_id?: string;
};
export type TArticle = TBase & {
  name: string;
  description: string;
  tabs: string[];
  section: TSection;
};
export type ArticleOneDto = {
  team_id: string;
  article_id: string;
};
