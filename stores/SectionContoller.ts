import { defineStore } from 'pinia';
import { TSection } from '~/utils/types/secton';
import { TParent } from '~/utils/types/sidebar';

/**
 * --------------------------------
 * Хранилище элементов в сайдбаре
 * --------------------------------
 */
export const useSectionsStore = defineStore('sectionsController', () => {
  /**
   * Свойства ----------------
   */
  const section: Ref<TSection | null> = ref(null); // Текущий раздел
  const sections: Ref<TSection[] | null> = ref([]); // Разделы
  const breadCrumbs: Ref<TParent[]> = ref([]); // Текущий раздел
  const isArticle: Ref<boolean> = ref(false); // Текущий раздел

  /**
   * Методы ----------------
   */
  // Установить раздел
  const setSection = (value: TSection) => {
    section.value = value;
  };
  // Установить 1 родительский раздел
  const setBreadCrumbs = (value: TParent[]) => {
    breadCrumbs.value = value;
  };
  // Установить разделы
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
