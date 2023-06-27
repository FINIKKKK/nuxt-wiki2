import { defineStore } from 'pinia';

/**
 * Типы ----------------
 */
interface TError {
  [key: string]: any;
}

interface TLoading {
  [key: string]: boolean;
}

/**
 * --------------------------------
 * Хранилище ошибок и значений запроса
 * --------------------------------
 */
export const useRequestStore = defineStore('requestController', () => {
  /**
   * Свойства ----------------
   */
  const errors: Ref<TError> = ref({}); // Ошибки
  const loading: Ref<TLoading> = ref({}); // Загрузка

  /**
   * Методы ----------------
   */
  // Добавить ошибки
  const addErrors = (obj: TError) => {
    const key = Object.keys(obj)[0];
    errors.value[key] = obj[key];
  };
  // Добавить значение загрузки
  const addIsLoading = (obj: TLoading) => {
    const key = Object.keys(obj)[0];
    loading.value[key] = obj[key];
  };

  // Возращаем данные
  return {
    errors,
    loading,
    addErrors,
    addIsLoading,
  };
});
