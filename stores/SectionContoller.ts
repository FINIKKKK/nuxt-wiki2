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
  const section: Ref<TSection | null> = ref(null);
  const sections: Ref<TSection[] | null> = ref([]);
  const breadCrumbs: Ref<TParent[]> = ref([]);
  const isArticle: Ref<boolean> = ref(false);

  /**
   * Методы ----------------
   */
  const setSection = (value: TSection) => {
    section.value = value;
  };
  const setBreadCrumbs = (value: TParent[]) => {
    breadCrumbs.value = value;
  };
  const setSections = (value: TSection[]) => {
    sections.value = value;
  };
  const setIsArticle = (value: boolean) => {
    isArticle.value = value;
  };

  // Возращаем данные
  return {
    section,
    sections,
    breadCrumbs,
    isArticle,
    setSection,
    setSections,
    setBreadCrumbs,
    setIsArticle,
  };
});
