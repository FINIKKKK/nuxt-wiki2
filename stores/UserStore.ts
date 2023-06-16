import { defineStore } from 'pinia';
import { TUser } from '~/api/models/account';
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
  };
});
