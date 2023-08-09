import { TBase } from '~/utils/types/index';
import { TSection } from '~/utils/types/secton';
import { OutputBlockData } from '@editorjs/editorjs';
import { TAbility, TTeam } from '~/utils/types/team';
import { TUser } from '~/utils/types/account';
import { TComment } from '~/utils/types/comment';

export interface TArticle extends TBase {
  name: string;
  description: string;
  tabs: TTabParse[];
  section: TSection;
  parent?: TSection;
  tags: any[];
  section_id: number;
  creator: TUser;
  team?: TTeam;
  comments: TComment[];
  status_id: number;
  created_by: number;
  status: {
    id: number;
    code: string;
  };
  public: number;
}

export interface TTab {
  name: string;
  content: OutputBlockData[];
  comments: TComment[];
}

export interface TTabParse {
  id: number;
  name: string;
  content: string;
  comments: TComment[]
}

export interface TArticleEdit {
  article: TArticle;
  abilities: {
    users: TAbility[];
  };
  canEdit: boolean;
  canShare: boolean;
}

export interface TProperties {
  bookmark: boolean;
  like: boolean;
  marked: boolean;
  rate: number;
  subscription: boolean;
  canEdit: boolean;
  canShare: boolean;
}

export interface TArticleData {
  article: TArticle;
  breadcrumbs: TSection[];
  properties: TProperties;
}

export interface THistory extends TBase {
  creator: TUser;
  content: string;
}
