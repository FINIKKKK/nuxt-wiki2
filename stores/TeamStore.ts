import { TActiveTeam, TTeam } from '~/api/models/team';
import { defineStore } from 'pinia';

/**
 * --------------------------------
 * Хранилище
 * --------------------------------
 */
export const useTeamStore = defineStore('teamStore', () => {
  /**
   * Свойства ----------------
   */
  const activeTeam: Ref<TActiveTeam | null> = ref(null); //

  /**
   * Методы ----------------
   */
  // Установить активную команду
  const setActiveTeam = (obj: TActiveTeam | null) => {
    activeTeam.value = obj;
  };

  /**
   * Вычисляемые значения ----------------
   */
  // Id активной команды
  const activeTeamId = computed(() => {
    return `/companies/${activeTeam.value?.team.id}`;
  });

  // Возращаем данные
  return {
    activeTeam,
    activeTeamId,
    setActiveTeam,
  };
});
