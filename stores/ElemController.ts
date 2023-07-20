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
  const isOpenAccess: Ref<boolean> = ref(false);
  const isOpenLink: Ref<boolean> = ref(false);
  const article: Ref<TArticleData | null> = ref(null);

  /**
   * Методы ----------------
   */
  const changeTypeElem = (value: 'section' | 'article') => {
    type.value = value;
  };
  const toggleAccess = () => {
    isOpenAccess.value = !isOpenAccess.value;
    console.log(isOpenAccess.value);
  };
  const openAccess = () => {
    isOpenAccess.value = true;
    console.log(isOpenAccess.value);
  };
  const closeAccess = () => {
    isOpenAccess.value = false;
  };
  const toggleLink = () => {
    isOpenLink.value = !isOpenLink.value;
  };
  const openLink = () => {
    isOpenLink.value = true;
  };
  const closeLink = () => {
    isOpenLink.value = false;
  };
  const setArticle = (value: TArticleData | null) => {
    article.value = value;
  };

  // Возращаем данные
  return {
    type,
    changeTypeElem,
    isOpenAccess,
    openAccess,
    closeAccess,
    toggleAccess,
    isOpenLink,
    openLink,
    closeLink,
    toggleLink,
    article,
    setArticle,
  };
});
