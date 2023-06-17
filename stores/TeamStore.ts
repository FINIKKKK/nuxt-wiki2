import { TActiveTeam, TeamEditDto, TTeam } from '~/api/models/team';
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
  // Изменить данные команды
  const editActiveTeam = (obj: TeamEditDto) => {
    if (activeTeam.value) {
      activeTeam.value.team.name = obj.name;
      activeTeam.value.team.code = obj.code;
    }
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
    editActiveTeam,
  };
});
