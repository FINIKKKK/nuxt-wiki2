import { defineStore } from 'pinia';

/**
 * --------------------------------
 * Хранилище
 * --------------------------------
 */
export const useElemStore = defineStore('elemController', () => {
  /**
   * Свойства ----------------
   */
  const type: Ref<'section' | 'article'> = ref('section');
  const isShowAccessPopup: Ref<boolean> = ref(false);
  const isShowLinkPopup: Ref<boolean> = ref(false);

  /**
   * Методы ----------------
   */
  const changeTypeElem = (value: 'section' | 'article') => {
    type.value = value;
  };
  const toggleAccessPopup = () => {
    isShowAccessPopup.value = !isShowAccessPopup.value;
  };
  const openAccessPopup = () => {
    isShowAccessPopup.value = true;
  };
  const closeAccessPopup = () => {
    isShowAccessPopup.value = false;
  };
  const toggleLinkPopup = () => {
    isShowLinkPopup.value = !isShowLinkPopup.value;
  };
  const openLinkPopup = () => {
    isShowLinkPopup.value = true;
  };
  const closeLinkPopup = () => {
    isShowLinkPopup.value = false;
  };

  // Возращаем данные
  return {
    type,
    changeTypeElem,
    isShowAccessPopup,
    openAccessPopup,
    closeAccessPopup,
    toggleAccessPopup,
    isShowLinkPopup,
    openLinkPopup,
    closeLinkPopup,
    toggleLinkPopup,
  };
});
