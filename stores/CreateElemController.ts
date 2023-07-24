import { defineStore } from 'pinia';
import { TAbility } from '~/utils/types/team';
import { TTab } from '~/utils/types/article';
import { TSelect } from '~/utils/types/base';

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
  const addTab = (value: TTab) => {
    tabs.value.push(value);
  };
  const setTags = (value: number[]) => {
    tags.value = value;
  };
  const addTag = (value: number) => {
    tags.value.push(value);
  };
  const setAbilities = (value: TAbility[]) => {
    abilities.value = value;
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

  // Возращаем данные
  return {
    title,
    select,
    tabs,
    tags,
    abilities,
    isOpenTags,
    isOpenAccess,
    isLoading,
    errors,
    setTitle,
    setSelect,
    setTabs,
    addTab,
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
  };
});
