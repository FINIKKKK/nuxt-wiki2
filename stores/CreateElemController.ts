import { defineStore } from 'pinia';
import { TAbility } from '~/utils/types/team';
import { TTab } from '~/utils/types/article';

/**
 * --------------------------------
 * Хранилище
 * --------------------------------
 */
export const useCreateElemStore = defineStore('createElemController', () => {
  /**
   * Свойства ----------------
   */
  const title: Ref<string> = ref(''); // Значение заголовка
  const select: Ref<any> = ref(null); // Значение селекта
  const tabs: Ref<TTab[]> = ref([]); // Значение вкладок
  const tags: Ref<number[]> = ref([]); // Значение тэгов
  const abilities: Ref<TAbility[]> = ref([]); // Значение доступов
  const isShowTags: Ref<boolean> = ref(false); // Показывать попап тэгов?
  const isShowAccess: Ref<boolean> = ref(false); // Показывать попап доступа?
  const isLoading: Ref<boolean> = ref(false); // Загрузка
  const errors: Ref<string[]> = ref([]); // Ошибки валидации

  /**
   * Методы ----------------
   */
  // Установить заголовок
  const setTitle = (value: string) => {
    title.value = value;
  };
  // Установить селект
  const setSelect = (value: any) => {
    select.value = value;
  };
  // Добавить вкладку
  const addTab = (value: TTab) => {
    tabs.value.push(value);
  };
  // Добавить тэг
  const addTag = (value: number) => {
    tags.value.push(value);
  };
  // Добавить доступ
  const addAbility = (value: TAbility) => {
    abilities.value.push(value);
  };
  // Показывать или скрыть попап тэгов
  const toggleTags = () => {
    isShowTags.value = !isShowTags.value;
  };
  // Показывать или скрыть попап доступа
  const toggleAccess = () => {
    isShowAccess.value = !isShowAccess.value;
  };
  // Установить загрузку
  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };
  // Установить ошибки валидации
  const setErrors = (value: string[]) => {
    errors.value = value;
  };

  // Возращаем данные
  return {
    title,
    select,
    tabs,
    tags,
    abilities,
    isShowTags,
    isShowAccess,
    isLoading,
    errors,
    setTitle,
    setSelect,
    addTab,
    addTag,
    addAbility,
    toggleTags,
    toggleAccess,
    setLoading,
    setErrors,
  };
});
