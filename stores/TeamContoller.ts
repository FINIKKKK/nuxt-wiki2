import { defineStore } from 'pinia';
import { TActiveTeam, TeamEditDto, TTeam } from '~/utils/types/team';

/**
 * --------------------------------
 * Хранилище команд
 * --------------------------------
 */
export const useTeamStore = defineStore('teamController', () => {
  /**
   * Свойства ----------------
   */
  const teams: Ref<TTeam[]> = ref([]);
  const activeTeam: Ref<TActiveTeam | null> = ref(null);

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
  // Роль пользователя
  const role = computed(() => {
    return activeTeam.value?.role.name;
  });
  // Владелец?
  const isOwner = computed(() => {
    return role.value === 'owner';
  });
  // Админ или модератор?
  const adminOrModer = computed(() => {
    return role.value === 'admin' || role.value === 'moderator';
  });
  // Пользователь?
  const isUser = computed(() => {
    return role.value === 'user';
  });
  // Есть доступ для редактирования?
  const isAccessEdit = computed(() => {
    return (
      role.value === 'admin' ||
      role.value === 'moderator' ||
      role.value === 'owner'
    );
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
    role,
    isOwner,
    adminOrModer,
    isUser,
    isAccessEdit,
  };
});
