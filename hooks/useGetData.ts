import { useFetch } from '#app';
import { FetchOptions } from 'ofetch';

/**
 * Хук для запросов методов GET
 */
export const useGetData = async (
  url: string,
  options?: FetchOptions,
) => {
  const token = useCookie('token'); // Токен

  // Хук useFetch
  const { data, pending, error } = await useFetch(url, {
    transform<T>(data: any) {
      return data.data;
    },
    ...options, // Дополнительные опции
    baseURL: 'https://api.wiki.itl.systems/', // Главный URL
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`, // Установка заголовка авторизации с использованием токена
    },
    method: 'GET',
  });

  // Возвращаем данные
  return {
    data,
    error,
    pending,
  };
};
