import {AxiosInstance} from 'axios';
import {TBase} from '~/api/types';
import {TSection} from "~/api/models/section";

/**
 * Типы ----------------
 */
export type ArticleDto = TBase & {
    team_id: string;
    name: string;
    tabs: string[];
    section_id?: string;
};
export type TArticle = TBase & {
    name: string;
    description: string;
    tabs: string[];
    section: TSection;
};
export type ArticleOneDto = {
    team_id: string;
    article_id: string;
};

/**
 * Модель (Статья) ----------------
 */
export const ArticleApi = (instance: AxiosInstance) => ({
    // Создаем новый статью
    async add(dto: ArticleDto) {
        const {data} = await instance.post<ArticleDto, { data: TArticle }>(
            'team/article/add',
            dto,
        );
        return data;
    },

    // Получить все статьи
    async getAll(team_id: string) {
        const {data} = await instance.get<{ data: TArticle[] }>(
            `team/article/articles?team_id=${team_id}`,
        );
        return data;
    },

    // Получить статью
    async getOne(dto: ArticleOneDto) {
        const {data} = await instance.get<{ data: TArticle }>(
            `team/article?article_id=${dto.article_id}&team_id=${dto.team_id}`,
        );
        return data;
    },

    // Получить данные статьи для редактирования
    async editGet(dto: ArticleOneDto) {
        const {data} = await instance.get<{ data: TArticle }>(
            `team/article/edit?article_id=${dto.article_id}&team_id=${dto.team_id}`,
        );
        return data;
    },

    // Редактировать статью
    async edit(dto: ArticleDto) {
        const {data} = await instance.post<ArticleDto, { data: TArticle }>(
            `team/article/edit`,
            dto,
        );
        return data;
    },

    // Удалить статью
    async delete(dto: ArticleOneDto) {
        const {data} = await instance.post<{ data: any }>(
            `team/article/delete`,
            dto,
        );
        return data;
    },
});
