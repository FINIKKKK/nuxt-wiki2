import axios from 'axios';
import { AccountApi } from '~/api/models/account';
import { TeamApi } from '~/api/models/team';
import { RoleApi } from '~/api/models/role';

// Определение типа возвращаемых значений
export type ApiReturnTypes = {
  account: ReturnType<typeof AccountApi>;
  team: ReturnType<typeof TeamApi>;
  role: ReturnType<typeof RoleApi>;
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
  };
};
