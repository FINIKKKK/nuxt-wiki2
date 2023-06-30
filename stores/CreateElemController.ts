import { defineStore } from 'pinia';

/**
 * --------------------------------
 * Хранилище
 * --------------------------------
 */
export const useCreateElemStore = defineStore('createElemController', () => {
  /**
   * Свойства ----------------
   */
  // const title: Ref<string> = ref(''); // Заголовок
  // const select: Ref<TSE> = ref(''); // Заголовок
  // const tabs: Ref<string> = ref(''); // Заголовок
  // const tabs: Ref<string> = ref(''); // Заголовок
  // const abilities: Ref<string> = ref(''); // Заголовок
  const isShowTags: Ref<boolean> = ref(false); // Показывать попап тэгов?
  const isShowAccess: Ref<boolean> = ref(false); // Показывать попап доступа?

  /**
   * Методы ----------------
   */
  // Установить
  // const setElem = (value: TElem) => {
  //   elem.value = value;
  // };
  // Показывать или скрыть попап тэгов
  const toggleTags = () => {
    isShowTags.value = !isShowTags.value;
  };
  // Показывать или скрыть попап тэгов
  const toggleAccess = () => {
    isShowTags.value = !isShowTags.value;
  };

  // Возращаем данные
  return {
    isShowTags,
    isShowAccess,
    toggleTags,
    toggleAccess,
  };
});
