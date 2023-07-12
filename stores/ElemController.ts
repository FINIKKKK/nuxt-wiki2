import { defineStore } from 'pinia';
import { TArticleData } from '~/utils/types/article';

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
  const article: Ref<TArticleData | null> = ref(null);

  /**
   * Методы ----------------
   */
  const changeTypeElem = (value: 'section' | 'article') => {
    type.value = value;
  };
  const toggleAccessPopup = () => {
    isShowAccessPopup.value = !isShowAccessPopup.value;
    console.log(isShowAccessPopup.value);
  };
  const openAccessPopup = () => {
    isShowAccessPopup.value = true;
    console.log(isShowAccessPopup.value);
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
  const setArticle = (value: TArticleData | null) => {
    article.value = value;
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
    article,
    setArticle,
  };
});
