import { defineStore } from 'pinia';

/**
 * --------------------------------
 * Хранилище
 * --------------------------------
 */
export const useEmployeesStore = defineStore('employeesController', () => {
  /**
   * Свойства ----------------
   */
  // const employees: Ref<TEmployees | null> = ref(null);
  const isOpenRoles: Ref<boolean> = ref(false);
  const refBtn: Ref<any> = ref(null);

  /**
   * Методы ----------------
   */
  const openRoles = () => {
    isOpenRoles.value = true;
  };
  const closeRoles = () => {
    isOpenRoles.value = false;
  };
  const setRefBtn = (value: any) => {
    refBtn.value = value;
  };

  // Возращаем данные
  return {
    // employees,
    isOpenRoles,
    openRoles,
    closeRoles,
    refBtn,
    setRefBtn,
  };
});
