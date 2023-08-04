import { defineStore } from 'pinia';
import { TUser } from '~/utils/types/account';
import { useTeamStore } from '~/stores/TeamContoller';
import { TEmployees } from '~/utils/types/team';

/**
 * --------------------------------
 * Хранилище страницы работников
 * --------------------------------
 */
export const useEmployeesStore = defineStore('employeesController', () => {
  /**
   * Переменные ----------------
   */
  const teamController = useTeamStore();

  /**
   * Свойства ----------------
   */
  const isOpenRoles: Ref<boolean> = ref(false);
  const isOpenAddUsers: Ref<boolean> = ref(false);
  const user: Ref<TUser | null> = ref(null);
  const successMessage: Ref<string> = ref('');
  const employeesSearch = ref<TEmployees | null>(null);

  /**
   * Методы ----------------
   */
  const openRoles = () => {
    isOpenRoles.value = true;
  };
  const closeRoles = () => {
    isOpenRoles.value = false;
  };
  const setUser = (value: TUser | null) => {
    user.value = value;
  };
  const openAddUsers = () => {
    isOpenAddUsers.value = true;
  };
  const closeAddUsers = () => {
    isOpenAddUsers.value = false;
  };
  const setSuccessMessage = (value: string) => {
    successMessage.value = value;
  };
  const searchUser = (value: string) => {
    if (value) {
      employeesSearch.value = {
        invites:
          teamController.employees?.invites.filter((obj) =>
            obj.fullname.toLowerCase().includes(value.toLowerCase()),
          ) || [],
        employees:
          teamController.employees?.employees.filter((obj) =>
            obj.fullname.toLowerCase().includes(value.toLowerCase()),
          ) || [],
      };
    } else {
      employeesSearch.value = teamController.employees;
    }
  };
  const changeUsersList = () => {
    employeesSearch.value = teamController.employees;
  };

  // Возращаем данные
  return {
    isOpenRoles,
    isOpenAddUsers,
    openRoles,
    closeRoles,
    openAddUsers,
    closeAddUsers,
    user,
    setUser,
    successMessage,
    setSuccessMessage,
    employeesSearch,
    searchUser,
    changeUsersList,
  };
});
