import { defineStore } from 'pinia';
import {
  TAbility,
  TActiveTeam,
  TeamEditDto,
  TEmployees,
  TTeam,
} from '~/utils/types/team';
import { TUser } from '~/utils/types/account';
import { useUserStore } from '~/stores/UserController';

/**
 * --------------------------------
 * Хранилище команд
 * --------------------------------
 */
export const useTeamStore = defineStore('teamController', () => {
  /**
   * Переменные ----------------
   */
  const userController = useUserStore();

  /**
   * Свойства ----------------
   */
  const teams: Ref<TTeam[]> = ref([]);
  const activeTeam: Ref<TActiveTeam | null> = ref(null);
  const employees = ref<TEmployees | null>(null);

  /**
   * Методы ----------------
   */
  const setActiveTeam = (value: TActiveTeam | null) => {
    activeTeam.value = value;
  };
  const setTeams = (value: TTeam[]) => {
    teams.value = value;
  };
  const editActiveTeam = (value: TeamEditDto) => {
    if (activeTeam.value) {
      activeTeam.value.team.name = value.name;
      activeTeam.value.team.code = value.code;
    }
  };
  const setEmployees = (value: TEmployees | null) => {
    employees.value = value;
  };
  const addEmployees = (value: TEmployees) => {
    employees.value = {
      invites: employees.value?.invites,
      employees: [...employees.value?.employees, ...value?.employees],
    };
  };
  const removeFromTeam = (id: number) => {
    if (employees.value) {
      employees.value.employees = employees.value.employees.filter(
        (obj: TUser) => obj.id !== id,
      );
    }
  };
  const removeFromInvites = (id: number) => {
    if (employees.value) {
      employees.value.invites = employees.value.invites.filter(
        (obj: TUser) => obj.id !== id,
      );
    }
  };

  /**
   * Вычисляемые значения ----------------
   */
  const activeTeamId = computed(() => {
    return activeTeam.value?.team.id;
  });
  const activeTeamSlug = computed(() => {
    return `/companies/${activeTeam.value?.team.id}`;
  });
  const role = computed(() => {
    return activeTeam.value?.role.name;
  });
  const isOwner = computed(() => {
    return role.value === 'owner';
  });
  const adminOrModer = computed(() => {
    return role.value === 'admin' || role.value === 'moderator';
  });
  const isUser = computed(() => {
    return role.value === 'user';
  });
  const isAccessEdit = computed(() => {
    return (
      role.value === 'admin' ||
      role.value === 'moderator' ||
      role.value === 'owner'
    );
  });
  const teamEmployees = computed(() => {
    return employees.value?.employees.filter(
      (obj) => obj.id !== userController?.user?.id,
    );
  });
  const searchUser = (value: string) => {
    return teamEmployees.value?.filter((obj) =>
      obj.fullname.toLowerCase().includes(value.toLowerCase()),
    );
  };

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
    employees,
    setEmployees,
    addEmployees,
    teamEmployees,
    removeFromTeam,
    removeFromInvites,
    searchUser
  };
});
