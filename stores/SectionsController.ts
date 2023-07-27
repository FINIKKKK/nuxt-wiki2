import { defineStore } from 'pinia';
import { TSection } from '~/utils/types/secton';
import { TParent } from '~/utils/types/sidebar';

/**
 * --------------------------------
 * Хранилище разделов
 * --------------------------------
 */
export const useSectionsStore = defineStore('sectionsController', () => {
  /**
   * Свойства ----------------
   */
  const sections: Ref<TSection[] | null> = ref([]);
  const breadCrumbs: Ref<TParent[]> = ref([]);

  /**
   * Методы ----------------
   */
  const setBreadCrumbs = (value: TParent[]) => {
    breadCrumbs.value = value;
  };
  const setSections = (value: TSection[]) => {
    sections.value = value;
  };

  // Возращаем данные
  return {
    sections,
    breadCrumbs,
    setSections,
    setBreadCrumbs,
  };
});
