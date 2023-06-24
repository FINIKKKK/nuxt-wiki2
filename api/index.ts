import axios from 'axios';
import {AccountApi} from '~/api/models/account';
import {TeamApi} from '~/api/models/team';
import {RoleApi} from '~/api/models/role';
import {SectionApi} from '~/api/models/section';
import {ArticleApi} from "~/api/models/article";

// Определение типа возвращаемых значений
export type ApiReturnTypes = {
    account: ReturnType<typeof AccountApi>;
    team: ReturnType<typeof TeamApi>;
    role: ReturnType<typeof RoleApi>;
    section: ReturnType<typeof SectionApi>;
    article: ReturnType<typeof ArticleApi>;
};

// Функция Api
export const Api = (): ApiReturnTypes => {
    const token = useCookie('token'); // Достаем токен из куки

    // Создание экземпляра объекта axios
    const instance = axios.create({
        baseURL: 'https://api.wiki.itl.systems/', // Базовый URL
        headers: {
            Authorization: `Bearer ${token.value}`, // Установка заголовка авторизации с использованием токена
        },
    });

    // Возвращаемые модели со своими методами
    return {
        account: AccountApi(instance),
        team: TeamApi(instance),
        role: RoleApi(instance),
        section: SectionApi(instance),
        article: ArticleApi(instance),
    };
};

// const instance = Api();
// export default instance;
