import { defineStore } from 'pinia';

/**
 * --------------------------------
 * Хранилище сайдбара
 * --------------------------------
 */
export const useSidebarStore = defineStore('sidebarController', () => {
  /**
   * Свойства ----------------
   */
  const isOpen: Ref<boolean> = ref(false);
  const activeItem: Ref<string | null> = ref(null);
  const currentComponent: Ref<string | null> = ref(null);
  const isActiveMap: Ref<boolean> = ref(false);
  const isEndScrollPage: Ref<boolean> = ref(false);

  /**
   * Методы ----------------
   */
  const open = (value: string) => {
    isOpen.value = true;
    activeItem.value = value;
  };
  const close = () => {
    isOpen.value = false;
    activeItem.value = null;
  };
  const setActiveItem = (value: string | null) => {
    activeItem.value = value;
  };
  const changeComponent = (value: string | null) => {
    currentComponent.value = value;
  };
  const openMap = () => {
    isActiveMap.value = true;
  };
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
    setEndScrollPage,
  };
});
