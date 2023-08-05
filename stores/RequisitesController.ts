import { defineStore } from 'pinia';
import { TRequisites } from '~/utils/types/billing';

/**
 * --------------------------------
 * Хранилище реквизитов
 * --------------------------------
 */
export const useRequisitesStore = defineStore('requisitesController', () => {
  /**
   * Свойства ----------------
   */
  const requisites = ref<TRequisites | null>(null);

  /**
   * Методы ----------------
   */
  const setRequisites = (value: TRequisites) => {
    requisites.value = value;
  };

  // Возращаем данные
  return {
    requisites,
    setRequisites,
  };
});
