import { TBase } from '~/utils/types/index';
import { TSection } from '~/utils/types/secton';
import { OutputBlockData } from '@editorjs/editorjs';
import { TAbility } from '~/utils/types/team';

export type ArticleDto = TBase & {
  team_id: string;
  name: string;
  tabs: string[];
  section_id?: string;
};
export type TArticle = TBase & {
  name: string;
  description: string;
  tabs: TTabParse[];
  section: TSection;
  tags: any[];
  section_id: number;
};
export type ArticleOneDto = {
  team_id: string;
  article_id: string;
};

export type TTabParse = {
  name: string;
  content: string;
};

export type TArticleEdit = {
  article: TArticle;
  abilities: {
    users: TAbility[];
  };
  canEdit: boolean;
  canShare: boolean;
};

export type TTab = {
  name: string;
  content: OutputBlockData[];
};

export type TSelect = {
  value: number;
  label: string;
};
