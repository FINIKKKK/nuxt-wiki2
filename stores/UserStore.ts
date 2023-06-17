import { defineStore } from 'pinia';
import { TUser, UserDataDto } from '~/api/models/account';
import { TTeam } from '~/api/models/team';

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
  const teams: Ref<TTeam[]> = ref([]); // Команды

  /**
   * Методы ----------------
   */
  // Сохранить пользователя
  const setUser = (obj: TUser | null) => {
    user.value = obj;
  };
  // Обновить данные
  const updateUserData = (obj: UserDataDto) => {
    if (user.value) {
      user.value.first_name = obj.first_name;
      user.value.last_name = obj.last_name;
      user.value.email = obj.email;
    }
  };
  // Обновить аватарку
  const updateUserAvatar = (obj: string) => {
    if (user.value) {
      user.value.picture = obj;
    }
  };
  // Сохранить  команды
  const setTeams = (obj: TTeam[]) => {
    teams.value = obj;
  };

  // Возвращаем данные
  return {
    user,
    teams,
    setUser,
    setTeams,
    updateUserData,
    updateUserAvatar
  };
});
