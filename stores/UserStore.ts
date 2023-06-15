import { defineStore } from 'pinia';
import { TUser } from '~/api/models/account';

/**
 * --------------------------------
 * Хранилище пользователя
 * --------------------------------
 */
export const useUserStore = defineStore('userStore', () => {
  /**
   * Свойства ----------------
   */
  const user: Ref<TUser | null> = ref(null); // Пользователь

  /**
   * Методы ----------------
   */
  // Установить пользователя
  const setUser = (obj: TUser) => {
    user.value = obj;
  };

  // Возвращаем данные
  return {
    user,
    setUser,
  };
});
