import { TBase } from '~/utils/types/index';
import { TTeam } from '~/utils/types/team';

export type LoginDto = {
  email: string;
  password: string;
};
export type RegisterDto = LoginDto & {
  first_name: string;
  last_name: string;
  phone: string;
};
export type TUser = TBase & {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  date_format: string;
  fullname: string;
  locale: string;
  logged_in: string;
  online: boolean;
  picture: string;
};
export type TAuthData = {
  token: string;
  user: TUser;
};
export type TUserData = {
  user: TUser;
  teams: TTeam[];
};
export type UserDataDto = {
  first_name: string;
  last_name: string;
  email: string;
};
export type UserPasswordDto = {
  password: string;
  new_password: string;
};
export type TAbility = {
  user: TUser;
  permission: number;
};
