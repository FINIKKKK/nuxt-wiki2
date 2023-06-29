import { AsyncData } from '#app';
import { FetchOptions } from 'ofetch';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Хук для запросов
 */
export const useCustomFetch = async <T>(
  url: string,
  options?: FetchOptions & { method?: string },
) => {
  const token = useCookie('token'); // Токен
  const requestController = useRequestStore(); // Хранилище запроса
  const config = useRuntimeConfig(); // Конфиг

  // Хук useFetch
  const { data, pending, error } = (await useFetch(url, {
    transform(data: { data: T }): T {
      return data.data;
    },
    ...options, // Дополнительные опции
    baseURL: config.public.apiUrl, // Главный URL
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`, // Установка заголовка авторизации с использованием токена
    },
    //  Метод
    method:
      (options?.method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE') || 'GET',
  })) as AsyncData<T, any>;

  // Конвертируем ошибки
  if (options?.method === 'POST') {
    for (const key in error.value?.data.messages) {
      if (error.value?.data.messages.hasOwnProperty(key)) {
        const messageArray = error.value?.data.messages[key];
        error.value = messageArray;
      }
    }
  }

  // Сохраняем данные в хранилице
  requestController.addErrors({ [url]: error.value });
  requestController.addIsLoading({ [url]: pending.value });

  // Возвращаем данные
  return { data };
};
