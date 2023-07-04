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
  const parent1: Ref<TParent | null> = ref(null); // 1 родительский раздел
  const parent2: Ref<TParent | null> = ref(null); // 2 родительский раздел
  const isChild: Ref<boolean> = ref(false); // Это ребенок?
  const sections: Ref<TSection[] | null> = ref([]); // Разделы

  /**
   * Методы ----------------
   */
  // Установить раздел
  const setSection = (value: TSection) => {
    section.value = value;
  };
  // Установить 1 родительский раздел
  const setParent1 = (value: TParent | null) => {
    parent1.value = value;
  };
  // Установить 2 родительский раздел
  const setParent2 = (value: TParent | null) => {
    parent2.value = value;
  };
  // Установить разделы
  const setSections = (value: TSection[]) => {
    sections.value = value;
  };
  // Изменить значение ребенка
  const setIsChild = (value: boolean) => {
    isChild.value = value;
  };

  // Возращаем данные
  return {
    section,
    parent1,
    parent2,
    isChild,
    sections,
    setSection,
    setParent1,
    setParent2,
    setSections,
    setIsChild,
  };
});
