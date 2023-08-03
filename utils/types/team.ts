import { TBase } from '~/utils/types/index';
import { TUser } from '~/utils/types/account';
import { TRole } from '~/utils/types/role';
import { TSelect } from '~/utils/types/base';

export interface TTeam extends TBase {
  name: string;
  code: string;
  active: string;
  balance: number;
  debiting_at: string;
  deleted_at: any;
  description: any;
  employees_count: number;
  groups: any;
  owner: TUser;
  plan: any;
  plan_id: number;
  role: any;
  roles: any;
  subscribed_at: string;
  trial: string;
  unread_notification: number;
  user_id: number;
}

export interface TActiveTeam {
  team: TTeam;
  role: TRole;
}

export interface TeamEditDto {
  team_id?: number;
  name: string;
  code: string;
}

export interface TEmployees {
  employees: TUser[];
  invites: TUser[];
}

export interface TAbilities {
  users: TUser[];
  groups: TUser[];
}

export interface TAbility {
  user: TUser;
  permission: TSelect;
}
