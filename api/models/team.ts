import { AxiosInstance } from 'axios';
import { TBase } from '~/api/types';
import { TUser } from '~/api/models/account';
import { TRole } from '~/api/models/role';

/**
 * Типы ----------------
 */
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

/**
 * Модель (Команды) ----------------
 */
export const TeamApi = (instance: AxiosInstance) => ({
  // Добавляем новую команду
  async add(dto: TeamDto) {
    const { data } = await instance.post<TeamDto, { data: number }>(
      '/team/add',
      dto,
    );
    return data;
  },

  // Получить данные о команде
  async getOne(id: string) {
    const { data } = await instance.get<{ data: TActiveTeam }>(
      `/team?team_id=${id}`,
    );
    return data;
  },

  // Загрузить файл
  async upload(dto: any) {
    const { data } = await instance.post<any, { data: any }>(
      `/team/store/add`,
        dto
    );
    return data;
  },
});
