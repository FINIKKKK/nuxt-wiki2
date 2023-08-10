import { defineStore } from 'pinia';
import { TComment } from '~/utils/types/comment';

/**
 * --------------------------------
 * Хранилище комментариев
 * --------------------------------
 */
export const useCommentsStore = defineStore('commentsController', () => {
  /**
   * Свойства ----------------
   */
  const comments: Ref<TComment[]> = ref([]);
  const editComment: Ref<TComment | null> = ref(null);
  const fieldValue: Ref<string> = ref('');
  const commentsPopup: Ref<TComment[]> = ref([]);
  const editCommentPopup: Ref<TComment | null> = ref(null);
  const fieldValuePopup: Ref<string> = ref('');

  /**
   * Методы ----------------
   */
  const setComments = (value: TComment[]) => {
    comments.value = value;
  };
  const addComment = (value: TComment) => {
    comments.value.push(value);
  };
  const updateComments = (value: TComment) => {
    comments.value = comments.value.map((obj) =>
      obj.id === value.id ? value : obj,
    );
  };
  const removeComment = (id: number) => {
    comments.value = comments.value.filter((obj) => obj.id !== id);
  };
  const changeEditComment = (value: TComment | null) => {
    editComment.value = value;
  };
  const changeFieldValue = (value: string) => {
    fieldValue.value = value;
  };
  const setCommentsPopup = (value: TComment[]) => {
    commentsPopup.value = value;
  };
  const changeFieldValuePopup = (value: string) => {
    fieldValuePopup.value = value;
  };
  const clearInput = () => {
    const divInput = document.querySelector('.div_input');
    if (divInput instanceof HTMLElement) {
      divInput.innerHTML = '';
    }
  };
  const addCommentPopup = (value: TComment) => {
    commentsPopup.value = [...commentsPopup.value, value];
  };
  const changeEditCommentPopup = (value: TComment | null) => {
    editCommentPopup.value = value;
  };
  const removeCommentPopup = (id: number) => {
    commentsPopup.value = commentsPopup.value.filter((obj) => obj.id !== id);
  };
  const onFocus = () => {
    const divInput = document.querySelector('.div_input');
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(divInput);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    divInput.focus();
  };

  // Возращаем данные
  return {
    comments,
    setComments,
    addComment,
    updateComments,
    removeComment,
    editComment,
    changeEditComment,
    fieldValue,
    commentsPopup,
    setCommentsPopup,
    fieldValuePopup,
    editCommentPopup,
    changeFieldValue,
    changeFieldValuePopup,
    addCommentPopup,
    changeEditCommentPopup,
    removeCommentPopup,
    onFocus,
    clearInput
  };
});
