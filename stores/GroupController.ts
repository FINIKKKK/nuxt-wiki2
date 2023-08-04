import { defineStore } from 'pinia';
import { TUser } from '~/utils/types/account';
import { TGroup } from '~/utils/types/group';

/**
 * --------------------------------
 * Хранилище страницы группы
 * --------------------------------
 */
export const useGroupStore = defineStore('groupController', () => {
  /**
   * Свойства ----------------
   */
  const isOpenAddUsers: Ref<boolean> = ref(false);
  const successMessage: Ref<string> = ref('');
  const group = ref<TGroup | null>(null);
  const users = ref<TUser[]>([]);

  /**
   * Методы ----------------
   */
  const openAddUsers = () => {
    isOpenAddUsers.value = true;
  };
  const closeAddUsers = () => {
    isOpenAddUsers.value = false;
  };
  const setSuccessMessage = (value: string) => {
    successMessage.value = value;
  };
  const setGroup = (value: TGroup | null) => {
    group.value = value;
  };
  const setUsers = (value: TUser[]) => {
    users.value = value;
  };
  const addUsers = (value: TUser[]) => {
    users.value = [...users.value, ...value];
  };

  // Возращаем данные
  return {
    isOpenAddUsers,
    openAddUsers,
    closeAddUsers,
    successMessage,
    setSuccessMessage,
    group,
    setGroup,
    users,
    setUsers,
    addUsers,
  };
});
