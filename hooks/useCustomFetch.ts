import { AsyncData } from '#app';
import { FetchOptions } from 'ofetch';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Хук для запросов
 */
export const useCustomFetch = async <T>(
  url: string,
  options?: FetchOptions & { method?: string },
  formData?: FormData,
) => {
  const token = useCookie('token');
  const requestController = useRequestStore();
  const config = useRuntimeConfig();
  const isLoading = ref(true);

  // Ставим загрузку
  requestController.addIsLoading({ [url]: true });

  // Хук useFetch
  const { data, pending, error } = (await useFetch(url, {
    ...options, // Дополнительные опции
    baseURL: config.public.apiUrl, // Главный URL
    headers: {
      Authorization: `Bearer ${token.value}`, // Установка заголовка авторизации с использованием токена
    },
    //  Метод
    method:
      (options?.method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE') || 'GET',
    body: formData || options?.body, // Устанавливаем formData в теле запроса
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

  // Сохраняем ошибки в хранилице
  requestController.addErrors({ [url]: error.value });
  // Убираем загрузку
  requestController.addIsLoading({ [url]: false });
  isLoading.value = false;

  // Возвращаем данные
  return {
    // @ts-ignore
    data: data.value?.data,
    // @ts-ignore
    message: data.value?.messages,
    error: error.value,
    isLoading,
  };
};
