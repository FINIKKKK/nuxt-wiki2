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
  const isOpen: Ref<boolean> = ref(false); //
  const activeItem: Ref<string | null> = ref(null);

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
    isOpen.value = true;
    activeItem.value = null;
  };

  // Возращаем данные
  return {
    isOpen,
    activeItem,
    open,
    close,
  };
});
