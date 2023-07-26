import { defineStore } from 'pinia';
import { TArticleData } from '~/utils/types/article';
import { OutputBlockData } from '@editorjs/editorjs';
import {TComment} from "~/utils/types/comment";

/**
 * --------------------------------
 * Хранилище страницы радела или статьи
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
  const activeTab = ref<{ index: number; id: number | null }>({
    index: 0,
    id: null,
  });
  const isOpenComments = ref(false);
  const activeCommentBlock = ref<OutputBlockData[]>([]);
  const blockId = ref<any>(null);
  const comments = ref<TComment[]>([]);

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
  const openComments = () => {
    isOpenComments.value = true;
  };
  const closeComments = () => {
    isOpenComments.value = false;
  };
  const setActiveCommentBlock = (value: OutputBlockData) => {
    activeCommentBlock.value = [value];
  };
  const setActiveTab = (index: number, id: number) => {
    activeTab.value = { index, id };
  };
  const setActiveBlockId = (value: any) => {
    blockId.value = value;
  };
  const setComments = (value: TComment[]) => {
    comments.value = value
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
    activeCommentBlock,
    setActiveCommentBlock,
    isOpenComments,
    openComments,
    closeComments,
    activeTab,
    setActiveTab,
    blockId,
    setActiveBlockId,
    comments,
    setComments,
  };
});
