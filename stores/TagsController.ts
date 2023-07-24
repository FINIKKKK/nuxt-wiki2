import { defineStore } from 'pinia';
import { TTag } from '~/utils/types/tag';

/**
 * --------------------------------
 * Хранилище страницы тэгов
 * --------------------------------
 */
export const useTagsStore = defineStore('tagController', () => {
  /**
   * Свойства ----------------
   */
  const tags: Ref<TTag[]> = ref([]);
  const editId: Ref<number | null> = ref(null);
  const inputValue: Ref<string> = ref('');

  /**
   * Методы ----------------
   */
  const setTags = (value: TTag[]) => {
    tags.value = value;
  };
  const changeEditId = (value: number) => {
    editId.value = value;
  };
  const cancelEdit = () => {
    editId.value = null;
  };
  const changeInputValue = (value: string) => {
    inputValue.value = value;
  };

  // Возращаем данные
  return {
    tags,
    setTags,
    editId,
    changeEditId,
    cancelEdit,
    inputValue,
    changeInputValue,
  };
});
