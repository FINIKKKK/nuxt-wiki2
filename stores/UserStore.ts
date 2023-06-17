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
    user.value = {
      ...user.value,
      first_name: obj.first_name,
      last_name: obj.last_name,
      email: obj.email,
    };
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
  };
});
