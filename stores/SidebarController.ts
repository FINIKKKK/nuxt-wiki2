import { defineStore } from 'pinia';
import { TSection } from '~/utils/types/secton';

/**
 * --------------------------------
 * Хранилище сайдбара
 * --------------------------------
 */
export const useSidebarStore = defineStore('sidebarController', () => {
  /**
   * Свойства ----------------
   */
  const isOpen: Ref<boolean> = ref(false); // Открыт ли сайдбар?
  const activeItem: Ref<string | null> = ref(null); // Активный элемент в сайдбаре
  const currentComponent: Ref<string | null> = ref(null); // Текущий компонент
  const section: Ref<TSection | null> = ref(null); // Текущий раздел
  const sections: Ref<TSection[] | null> = ref(null); // Разделы
  const isActiveMap: Ref<boolean> = ref(false); // Разделы

  /**
   * Методы ----------------
   */
  // Открыть попап и установить активный элемент
  const open = (value: string) => {
    isOpen.value = true;
    activeItem.value = value;
  };
  // Закрыть попап и убрать активный элемент
  const close = () => {
    isOpen.value = false;
    activeItem.value = null;
  };
  // Установить активный элемент
  const setActiveItem = (value: string | null) => {
    activeItem.value = value;
  };
  // Изменить текущий компонент
  const changeComponent = (value: string | null) => {
    currentComponent.value = value;
  };
  // Установить раздел
  const setSection = (value: TSection) => {
    section.value = value;
  };
  // Установить разделы
  const setSections = (value: TSection[]) => {
    sections.value = value;
  };
  // Открыть карту разделов
  const openMap = () => {
    isActiveMap.value = true;
  };
  // Закрыть карту разделов
  const closeMap = () => {
    isActiveMap.value = false;
  };

  // Возращаем данные
  return {
    isOpen,
    activeItem,
    currentComponent,
    section,
    sections,
    isActiveMap,
    open,
    close,
    changeComponent,
    setActiveItem,
    setSection,
    setSections,
    openMap,
    closeMap,
  };
});
