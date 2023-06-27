import { useFetch } from '#app';
import { FetchOptions } from 'ofetch';
import { FetchError } from 'node-fetch';
import { Ref } from "@vue/reactivity";

/**
 * Хук для запросов методов POST
 */
export const usePostData = async () => {
  const token = useCookie('token'); // Токен
  const errors:Ref<FetchError | null> = ref(null); //
  const isLoading = ref(false); //

  // Функция handleSubmit
  const handleSubmit = async (
    url: string,
    dto: any,
    options?: FetchOptions,
  ) => {
    // Хук useFetch
    const { data, pending, error } = await useFetch(url, {
      body: dto, // Данные запроса
      ...options, // Дополнительные опции
      baseURL: 'https://api.wiki.itl.systems/', // Главный URL
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`, // Установка заголовка авторизации с использованием токена
      },
      method: 'POST', // Метод
      // Конвертируем данные
      transform<T>(data: any) {
        return data.data;
      },
    });

    // Конвертируем ошибки
    for (const key in error.value?.data.messages) {
      if (error.value?.data.messages.hasOwnProperty(key)) {
        const messageArray = error.value?.data.messages[key];
        errors.value = messageArray;
      }
    }
    // Устанавливаем загоузку
    isLoading.value = pending.value;

    // Возвращаем данные
    return data;
  };

  // Возвращаем данные
  return {
    errors,
    isLoading,
    handleSubmit,
  };
};
