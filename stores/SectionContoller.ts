import { defineStore } from 'pinia';
import { TSection } from '~/utils/types/secton';

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
  const isActiveHamburger: Ref<boolean> = ref(false); // Разделы

  /**
   * Методы ----------------
   */
  // Установить раздел
  const setSection = (value: TSection) => {
    section.value = value;
  };
  // Установить разделы
  const setSections = (value: TSection[]) => {
    sections.value = value;
  };
  // Установить разделы
  const setActiveHamburger = () => {
    isActiveHamburger.value = !isActiveHamburger.value;
  };

  // Возращаем данныеs
  return {
    section,
    sections,
    isActiveHamburger,
    setSection,
    setSections,
    setActiveHamburger,
  };
});
