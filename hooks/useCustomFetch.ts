import { useFetch } from '#app';
import { FetchOptions } from 'ofetch';

/**
 * Хук для запросов
 */
export const useCustomFetch = async (
  url: string,
  options?: FetchOptions & { method?: string },
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
    //  Метод
    method:
      (options?.method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE') || 'GET',
  });

  // Конвертируем ошибки
  if (options?.method === 'POST') {
    for (const key in error.value?.data.messages) {
      if (error.value?.data.messages.hasOwnProperty(key)) {
        const messageArray = error.value?.data.messages[key];
        error.value = messageArray;
      }
    }
  }

  // Возвращаем данные
  return {
    data,
    errors: error,
    isLoading: pending,
  };
};
