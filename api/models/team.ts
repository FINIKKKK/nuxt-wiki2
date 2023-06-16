import { AxiosInstance } from 'axios';
import { TBase, TMessage } from '~/api/types';

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
});
