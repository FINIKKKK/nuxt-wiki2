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
  const isActiveMap: Ref<boolean> = ref(false); // Разделы
  const isEndScrollPage: Ref<boolean> = ref(false);

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
  // Открыть карту разделов
  const openMap = () => {
    isActiveMap.value = true;
  };
  // Закрыть карту разделов
  const closeMap = () => {
    isActiveMap.value = false;
  };
  const setEndScrollPage = (value: boolean) => {
    isEndScrollPage.value = value;
  };

  // Возращаем данные
  return {
    isOpen,
    activeItem,
    currentComponent,
    isActiveMap,
    open,
    close,
    changeComponent,
    setActiveItem,
    openMap,
    closeMap,
    isEndScrollPage,
    setEndScrollPage
  };
});
