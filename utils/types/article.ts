import { TBase } from '~/utils/types/index';
import { TSection } from '~/utils/types/secton';
import { OutputBlockData } from '@editorjs/editorjs';
import { TAbility } from '~/utils/types/team';
import { TUser } from '~/utils/types/account';

export interface TArticle extends TBase {
  name: string;
  description: string;
  tabs: TTabParse[];
  section: TSection;
  parent?: TSection;
  tags: any[];
  section_id: number;
  creator: TUser;
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

export interface TArticleData {
  article: TArticle;
  canEdit: boolean;
  canShare: boolean;
}
