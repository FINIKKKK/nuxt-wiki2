import {AxiosInstance} from 'axios';
import {TBase} from '~/api/types';

/**
 * Типы ----------------
 */
export type SectionDto = TBase & {
    team_id: string;
    name: string;
    description: string;
    section_id?: string;
};
export type TSection = TBase & {
    name: string;
    description: string;
    perent: TSection;
    child: TSection[];
};
export type SectionOneDto = {
    team_id: string;
    section_id: string;
};

/**
 * Модель (Раздел) ----------------
 */
export const SectionApi = (instance: AxiosInstance) => ({
    // Создаем новый раздел
    async add(dto: SectionDto) {
        const {data} = await instance.post<SectionDto, { data: TSection }>(
            'team/section/add',
            dto,
        );
        return data;
    },

    // Получить все разделы
    async getAll(team_id: string) {
        const {data} = await instance.get<{ data: TSection[] }>(
            `team/section/sections?team_id=${team_id}`,
        );
        return data;
    },

    // Получить раздел
    async getOne(dto: SectionOneDto) {
        const {data} = await instance.get<{ data: TSection }>(
            `team/section?section_id=${dto.section_id}&team_id=${dto.team_id}`,
        );
        return data;
    },

    // Получить данные раздела для редактирования
    async editGet(dto: SectionOneDto) {
        const {data} = await instance.get<{ data: TSection }>(
            `team/section/edit?section_id=${dto.section_id}&team_id=${dto.team_id}`,
        );
        return data;
    },

    // Редактировать раздел
    async edit(dto: SectionDto) {
        const {data} = await instance.post<SectionDto, { data: TSection }>(
            `team/section/edit`,
            dto,
        );
        return data;
    },

    // Удалить раздел
    async delete(dto: SectionOneDto) {
        const {data} = await instance.post<{ data: any }>(
            `team/section/delete`,
            dto,
        );
        return data;
    },
});
