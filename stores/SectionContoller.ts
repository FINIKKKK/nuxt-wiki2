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
  const parentId: Ref<number | null> = ref(null); // ID родительского раздела
  const isChild: Ref<boolean> = ref(false); // Это ребенок?
  const sections: Ref<TSection[] | null> = ref([]); // Разделы

  /**
   * Методы ----------------
   */
  // Установить раздел
  const setSection = (value: TSection) => {
    section.value = value;
  };
  // Установить родительский раздел
  const setParentId = (value: number | null) => {
    parentId.value = value;
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
    parentId,
    isChild,
    sections,
    setSection,
    setParentId,
    setSections,
    setIsChild,
  };
});
