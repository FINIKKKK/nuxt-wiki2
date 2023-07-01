import { TBase } from '~/utils/types/index';
import { TSection } from '~/utils/types/secton';
import { OutputBlockData } from '@editorjs/editorjs';
import { TAbility } from '~/utils/types/team';

export interface TArticle extends TBase {
  name: string;
  description: string;
  tabs: TTabParse[];
  section: TSection;
  tags: any[];
  section_id: number;
}

export interface TTab {
  name: string;
  content: OutputBlockData[];
}

export interface TTabParse {
  name: string;
  content: string;
}

export interface TArticleEdit {
  article: TArticle;
  abilities: {
    users: TAbility[];
  };
  canEdit: boolean;
  canShare: boolean;
}
