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
  const isOpenShare: Ref<boolean> = ref(false);
  const article: Ref<TArticleData | null> = ref(null);
  const activeTitle: Ref<any> = ref(null);

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
  const toggleShare = () => {
    isOpenShare.value = !isOpenShare.value;
  };
  const openShare = () => {
    isOpenShare.value = true;
  };
  const closeShare = () => {
    isOpenShare.value = false;
  };
  const setArticle = (value: TArticleData | null) => {
    article.value = value;
  };
  const changeActiveTitle = (value: any) => {
    activeTitle.value = value;
    const url = `#${value}`;
    window.history.pushState({ anchor: value }, '', url);
  };

  // Возращаем данные
  return {
    type,
    changeTypeElem,
    isOpenAccess,
    openAccess,
    closeAccess,
    toggleAccess,
    isOpenShare,
    openShare,
    closeShare,
    toggleShare,
    article,
    setArticle,
    activeTitle,
    changeActiveTitle,
  };
});
