import { AxiosInstance } from 'axios';
import { TBase } from '~/api/types';
import { OutputBlockData } from '@editorjs/editorjs';

/**
 * Типы ----------------
 */
export type SectionDto = {
  team_id: string;
  name: string;
  description: OutputBlockData[];
  section_id?: string;
};
export type TSection = TBase & {
  name: string;
  blocks: OutputBlockData[];
};

/**
 * Модель (Раздел) ----------------
 */
export const SectionApi = (instance: AxiosInstance) => ({
  // Создаем новый раздел
  async add(dto: SectionDto) {
    const { data } = await instance.post<SectionDto, { data: TSection }>(
      'team/section/add',
      dto,
    );
    return data;
  },

  // Получить все разделы
  async getAll(team_id: string) {
    const { data } = await instance.get<{ data: TSection[] }>(
      `team/section/sections?team_id=${team_id}`,
    );
    return data;
  },
});
