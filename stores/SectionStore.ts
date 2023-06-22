import { TSection } from '~/api/models/section';
import { defineStore } from 'pinia';
import { boolean } from 'yup';

/**
 * --------------------------------
 * Хранилище элементов в сайдбаре
 * --------------------------------
 */
export const useSectionsStore = defineStore('sectionsStore', () => {
  /**
   * Свойства ----------------
   */
  const section: Ref<TSection | null> = ref(null); // Текущий раздел
  const sections: Ref<TSection[] | null> = ref(null); // Разделы
  const isActiveHamburger: Ref<boolean> = ref(false); // Разделы

  /**
   * Методы ----------------
   */
  // Установить раздел
  const setSection = (obj: TSection) => {
    section.value = obj;
  };
  // Установить разделы
  const setSections = (obj: TSection[]) => {
    sections.value = obj;
  };
  // Установить разделы
  const setActiveHamburger = () => {
    isActiveHamburger.value = !isActiveHamburger.value;
  };

  // Возращаем данные
  return {
    section,
    sections,
    isActiveHamburger,
    setSection,
    setSections,
    setActiveHamburger,
  };
});
