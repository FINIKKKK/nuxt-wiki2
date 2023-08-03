import { defineStore } from 'pinia';
import { TUser } from '~/utils/types/account';

/**
 * --------------------------------
 * Хранилище
 * --------------------------------
 */
export const useEmployeesStore = defineStore('employeesController', () => {
  /**
   * Свойства ----------------
   */
  const isOpenRoles: Ref<boolean> = ref(false);
  const isOpenAddUsers: Ref<boolean> = ref(false);
  const user: Ref<TUser | null> = ref(null);
  const successMessage: Ref<string> = ref('');

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
  };
});
