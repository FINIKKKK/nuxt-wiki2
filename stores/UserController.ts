import { defineStore } from 'pinia';
import { TUser, UserDataDto } from '~/api/models/account';
import { TTeam } from '~/api/models/team';

/**
 * --------------------------------
 * Хранилище пользователя
 * --------------------------------
 */
export const useUserStore = defineStore('userController', () => {
  /**
   * Свойства ----------------
   */
  const user: Ref<TUser | null> = ref(null); // Пользователь

  /**
   * Методы ----------------
   */
  // Сохранить пользователя
  const setUser = (value: TUser | null) => {
    user.value = value;
  };
  // Обновить данные
  const updateUserData = (value: UserDataDto) => {
    if (user.value) {
      user.value.first_name = value.first_name;
      user.value.last_name = value.last_name;
      user.value.email = value.email;
    }
  };
  // Обновить аватарку
  const updateUserAvatar = (value: string) => {
    if (user.value) {
      user.value.picture = value;
    }
  };

  // Возвращаем данные
  return {
    user,
    setUser,
    updateUserData,
    updateUserAvatar,
  };
});
