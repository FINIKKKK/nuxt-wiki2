import { defineStore } from 'pinia';
import { TAbilities, TAbility } from '~/utils/types/team';
import { TArticleEdit, TTab } from '~/utils/types/article';
import { TSelect } from '~/utils/types/base';
import { TUser } from '~/utils/types/account';

/**
 * --------------------------------
 * Хранилище страницы создания элемента
 * --------------------------------
 */
export const useCreateElemStore = defineStore('createElemController', () => {
  /**
   * Свойства ----------------
   */
  const title: Ref<string> = ref('');
  const select: Ref<TSelect | null> = ref(null);
  const tabs: Ref<TTab[]> = ref([]);
  const tags: Ref<number[]> = ref([]);
  const abilities: Ref<TAbility[]> = ref([]);
  const isOpenTags: Ref<boolean> = ref(false);
  const isOpenAccess: Ref<boolean> = ref(false);
  const isLoading: Ref<boolean> = ref(false);
  const errors: Ref<any> = ref([]);
  const isPublish = ref(false);
  const article = ref<TArticleEdit | null>(null);
  const activeTab = ref<number>(0);

  /**
   * Методы ----------------
   */
  const setTitle = (value: string) => {
    title.value = value;
  };
  const setSelect = (value: TSelect | null) => {
    select.value = value;
  };
  const setTabs = (value: TTab[]) => {
    tabs.value = value;
  };
  const setActiveTab = (index: number) => {
    activeTab.value = index;
  };
  const addTab = (value: TTab) => {
    tabs.value.push(value);
  };
  const editTab = (index: number, name: string) => {
    tabs.value[index].name = name;
  };
  const removeTab = (index: number) => {
    tabs.value.splice(index, 1);
    if (activeTab.value === index) {
      console.log(activeTab.value);
      activeTab.value = 0;
    }
  };
  const setTags = (value: number[]) => {
    tags.value = value;
  };
  const addTag = (value: number) => {
    tags.value.push(value);
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
  const addAbility = (value: TAbility) => {
    abilities.value = [...abilities.value, value];
  };
  const openAccess = () => {
    isOpenAccess.value = true;
  };
  const closeAccess = () => {
    isOpenAccess.value = false;
  };
  const openTags = () => {
    isOpenTags.value = true;
  };
  const closeTags = () => {
    isOpenTags.value = false;
  };
  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };
  const setErrors = (value: any) => {
    errors.value = Object.values(value).flat(2);
  };
  const changePublish = (value: boolean) => {
    isPublish.value = value;
  };
  const setArticle = (value: TArticleEdit | null) => {
    article.value = value;
  };

  // Возращаем данные
  return {
    title,
    select,
    tabs,
    tags,
    activeTab,
    setActiveTab,
    abilities,
    isOpenTags,
    isOpenAccess,
    isLoading,
    errors,
    setTitle,
    setSelect,
    setTabs,
    addTab,
    editTab,
    removeTab,
    setTags,
    addTag,
    setAbilities,
    addAbility,
    openTags,
    openAccess,
    closeTags,
    closeAccess,
    setLoading,
    setErrors,
    isPublish,
    changePublish,
    article,
    setArticle,
  };
});
