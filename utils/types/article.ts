import { TBase } from '~/utils/types/index';
import { TSection } from '~/utils/types/secton';
import { OutputBlockData } from '@editorjs/editorjs';
import {TAbility, TTeam} from '~/utils/types/team';
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
  team?: TTeam
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
