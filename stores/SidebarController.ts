import { defineStore } from 'pinia';
import { TSection } from '~/api/models/section';
import { boolean } from 'yup';

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
  const currentComponent = shallowRef(null); // Текущий компонент
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
    isOpen.value = true;
    activeItem.value = null;
  };
  // Изменить текущий компонент
  const changeComponent = (value: any) => {
    currentComponent.value = value;
  };
  // Установить раздел
  const setSection = (obj: TSection) => {
    section.value = obj;
  };
  // Установить разделы
  const setSections = (obj: TSection[]) => {
    sections.value = obj;
  };
  // Открыть или закрыть карту разделов
  const toggleOpenMap = () => {
    isActiveMap.value = !isActiveMap.value;
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
    setSection,
    setSections,
    toggleOpenMap,
  };
});
