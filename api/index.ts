import axios from 'axios';
import { AccountApi } from '~/api/models/account';

// Определение типа возвращаемых значений
export type ApiReturnTypes = {
  account: ReturnType<typeof AccountApi>;
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

  // Возвращаемые модели с своими методами
  return {
    account: AccountApi(instance),
  };
};
