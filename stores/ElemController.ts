import { defineStore } from 'pinia';
import { TArticleData, TTab } from '~/utils/types/article';
import { OutputBlockData } from '@editorjs/editorjs';
import { TSectionData } from '~/utils/types/secton';
import { TAbilities, TAbility } from '~/utils/types/team';
import { TUser } from '~/utils/types/account';
import { values } from 'lodash';

/**
 * --------------------------------
 * Хранилище страницы радела или статьи
 * --------------------------------
 */
export const useElemStore = defineStore('elemController', () => {
  /**
   * Переменные ----------------
   */
  const router = useRouter();
  const route = useRoute();

  /**
   * Свойства ----------------
   */
  const type: Ref<'section' | 'article'> = ref('section');
  const isOpenAccess: Ref<boolean> = ref(false);
  const isOpenShare: Ref<boolean> = ref(false);
  const article: Ref<TArticleData | null> = ref(null);
  const section: Ref<TSectionData | null> = ref(null);
  const activeTitle: Ref<any> = ref(null);
  const activeTab = ref<{ index: number; id: number | null }>({
    index: 0,
    id: null,
  });
  const isOpenComments = ref(false);
  const activeCommentBlock = ref<OutputBlockData[]>([]);
  const blockId = ref<any>(null);
  const abilities = ref<TAbility[]>([]);
  const currentAbility = ref<TAbility | null>(null);
  const tabs = ref<TTab[]>([]);

  /**
   * Методы ----------------
   */
  const changeTypeElem = (value: 'section' | 'article') => {
    type.value = value;
  };
  const toggleAccess = () => {
    isOpenAccess.value = !isOpenAccess.value;
  };
  const openAccess = () => {
    isOpenAccess.value = true;
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
  const setSection = (value: TSectionData | null) => {
    section.value = value;
  };
  const changeActiveTitle = (value: any) => {
    activeTitle.value = value;
    const url = `#${value}`;
    router.replace({ query: route.query, hash: url });
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
    router.replace({ query: { tab: index }, hash: route.hash });
  };
  const setActiveBlockId = (value: any) => {
    blockId.value = value;
  };
  const setAbilities = (value: TAbilities) => {
    abilities.value = value.users.map((obj: TUser) => ({
      user: obj,
      permission: {
        value: obj.permission.level,
        label: obj.permission.name,
      },
    }));
  };
  const changeAbilities = (value: TAbility[]) => {
    abilities.value = value;
  };
  const setCurrentAbility = (value: TAbility | null) => {
    currentAbility.value = value;
  };
  const setTabs = (value: TTab[]) => {
    tabs.value = value;
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
    section,
    setSection,
    abilities,
    changeAbilities,
    setAbilities,
    currentAbility,
    setCurrentAbility,
    tabs,
    setTabs,
  };
});
