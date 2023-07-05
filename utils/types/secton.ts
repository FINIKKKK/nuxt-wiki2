import { TBase } from '~/utils/types/index';
import {TAbility, TTeam} from '~/utils/types/team';
import { TArticle } from '~/utils/types/article';
import { TUser } from '~/utils/types/account';

export interface TSection extends TBase {
  name: string;
  description: string;
  parent_id: number | null;
  parent: TSection | null;
  section?: TSection;
  creator: TUser;
  child: TSection[];
  children: TSection[];
  items: TArticle[];
  team?: TTeam
}

export interface TSectionEdit {
  section: TSection;
  abilities: {
    users: TAbility[];
  };
  canEdit: boolean;
  canShare: boolean;
}

export interface TSectionData {
  section: TSection;
  child: TSection[];
  items: TArticle[];
  canEdit: boolean;
  canShare: boolean;
}
