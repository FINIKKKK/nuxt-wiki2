import { TBase } from '~/utils/types/index';
import { TUser } from '~/utils/types/account';
import { TRole } from '~/utils/types/role';

export type TeamDto = {
  name: string;
  code: string;
};
export type TTeam = TBase & {
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
};
export type TActiveTeam = {
  role: TRole;
  team: TTeam;
};
export type TeamEditDto = TeamDto & {
  team_id: string;
};
export type TEmployees = {
  employees: TUser[];
  invites: TUser[];
};
