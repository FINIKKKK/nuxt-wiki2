import { TBase } from '~/utils/types/index';
import { TAbility, TTeam } from '~/utils/types/team';
import { TArticle } from '~/utils/types/article';
import { TUser } from '~/utils/types/account';
import { TParent } from '~/utils/types/sidebar';

export interface TSection extends TBase {
  name: string;
  description: string;
  parent_id: number | null;
  parent: TSection | null;
  creator: TUser;
  children: TSection[];
  team?: TTeam;
  breadcrumbs: TParent[];
  status_id?: number;
  section: TSection;
  child: TSection[];
  items: TArticle[];
  canEdit: boolean;
  canShare: boolean;
  public: number;
}

export interface TSectionEdit {
  section: TSection;
  abilities: {
    users: TAbility[];
  };
  canEdit: boolean;
  canShare: boolean;
}
