import { TActiveTeam, TeamEditDto, TTeam } from '~/api/models/team';
import { defineStore } from 'pinia';

/**
 * --------------------------------
 * Хранилище команд
 * --------------------------------
 */
export const useTeamStore = defineStore('teamController', () => {
  /**
   * Свойства ----------------
   */
  const teams: Ref<TTeam[]> = ref([]); // Команды
  const activeTeam: Ref<TActiveTeam | null> = ref(null); // Активная команда

  /**
   * Методы ----------------
   */
  // Установить активную команду
  const setActiveTeam = (obj: TActiveTeam | null) => {
    activeTeam.value = obj;
  };
  // Сохранить  команды
  const setTeams = (obj: TTeam[]) => {
    teams.value = obj;
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
    teams,
    activeTeamId,
    setActiveTeam,
    setTeams,
    editActiveTeam,
  };
});
