import { TArticle } from '~/utils/types/article';
import { TSection } from '~/utils/types/secton';
import { TUser } from '~/utils/types/account';

export interface TItem {
  icon: string;
  label: string;
  link?: string;
  method?: () => void;
  isShow?: boolean;
}

export interface TInnerItem {
  name: string;
  title: string;
  items?: TItem[];
}

export interface TSearchResults {
  tags: any[];
  articles: TArticle[];
  sections: TSection[];
  users: TUser[];
}

export interface TSearchData {
  results: TSearchResults;
  total: number;
}

export interface TParent {
  id: number;
  name: string;
  level: number;
}
