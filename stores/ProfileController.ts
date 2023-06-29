import {defineStore} from "pinia";

/**
 * --------------------------------
 * Хранилище
 * --------------------------------
 */
export const useProfileStore = defineStore('profileController', () => {
  /**
   * Свойства ----------------
   */
  const errors: Ref<string[]> = ref([]); // Ошибки
  const message: Ref<string> = ref(''); // Сообщение

  /**
   * Методы ----------------
   */
  // Установить ошибки
  const setErrors = (value: string[]) => {
    errors.value = value;
  };
  //  Установить сообщение
  const setMessage = (value: string) => {
    message.value = value;
  };

  // Возращаем данные
  return {
    errors,
    message,
    setErrors,
    setMessage,
  };
});
