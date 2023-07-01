import { TBase } from '~/utils/types/index';
import { TAbility } from '~/utils/types/team';

export interface TSection extends TBase {
  name: string;
  description: string;
  parent_id: number;
  child: TSection[];
}

export interface TSectionEdit {
  section: TSection;
  abilities: {
    users: TAbility[];
  };
  canEdit: boolean;
  canShare: boolean;
}
