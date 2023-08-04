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
  const usersSearch = ref<TUser[]>([]);

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
    usersSearch.value = value;
  };
  const addUsers = (value: TUser[]) => {
    users.value = [...users.value, ...value];
    usersSearch.value = [...users.value, ...value];
  };
  const removeUser = (id: number) => {
    users.value = users.value.filter((obj) => obj.id !== id);
    usersSearch.value = users.value.filter((obj) => obj.id !== id);
  };
  const searchUser = (value: string) => {
    if (value) {
      usersSearch.value = users.value.filter((obj) =>
        obj.fullname.toLowerCase().includes(value.toLowerCase()),
      );
    } else {
      usersSearch.value = users.value;
    }
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
    removeUser,
    usersSearch,
    searchUser,
  };
});
