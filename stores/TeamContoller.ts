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
  const setActiveTeam = (value: TActiveTeam | null) => {
    activeTeam.value = value;
  };
  // Сохранить  команды
  const setTeams = (value: TTeam[]) => {
    teams.value = value;
  };
  // Изменить данные команды
  const editActiveTeam = (value: TeamEditDto) => {
    if (activeTeam.value) {
      activeTeam.value.team.name = value.name;
      activeTeam.value.team.code = value.code;
    }
  };

  /**
   * Вычисляемые значения ----------------
   */
  // Id активной команды
  const activeTeamId = computed(() => {
    return activeTeam.value?.team.id;
  });
  // Slug активной команды
  const activeTeamSlug = computed(() => {
    return `/companies/${activeTeam.value?.team.id}`;
  });

  // Возращаем данные
  return {
    activeTeam,
    teams,
    activeTeamId,
    activeTeamSlug,
    setActiveTeam,
    setTeams,
    editActiveTeam,
  };
});
