<template>
  <div class="comment">
    <!-- Информация о комментарие -->
    <div class="info">
      <div class="user">{{ props.data.creator.fullname }}</div>
      <div class="date">
        {{ useFormatDate(props.data.created_at, userController.lang) }}
      </div>
    </div>

    <!-- Текст комментария -->
    <p class="text" v-html="commentText" />

    <!-- Попап с кнопками -->
    <div class="extra" ref="refPopup" v-if="isAccess">
      <i class="fa-regular fa-ellipsis-h" @click="isShowPopup = !isShowPopup" />

      <ul class="popup" v-if="isShowPopup">
        <li>
          <button @click="setEditComment">{{ $t?.edit }}</button>
        </li>
        <li>
          <button @click="onRemoveComment">{{ $t?.delete }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TComment } from '~/utils/types/comment';
import { useFormatDate } from '~/hooks/useFormatData';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCommentsStore } from '~/stores/CommentsController';
import { useUserStore } from '~/stores/UserController';
import { useOutsideClick } from '~/hooks/useOutsideClick';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TComment;
  isBlocks?: boolean;
}>();

/**
 * Переменные ----------------
 */
const isShowPopup = ref(false);
const teamController = useTeamStore();
const commentsController = useCommentsStore();
const userController = useUserStore();
const $t = await useTranslate('comments');
const refPopup = ref(null);

/**
 * Получение данных ----------------
 */
useOutsideClick(refPopup, isShowPopup);

/**
 * Вычисляемое ----------------
 */
// Текст комментария
const commentText = computed(() => {
  try {
    return JSON.parse(props.data.text);
  } catch (error) {
    return props.data.text;
  }
});
// Есть ли доступ для редактирования
const isAccess = computed(() => {
    return teamController.isAccessEdit || userController.user?.id === props.data.user_id
});

/**
 * Методы ----------------
 */
const onRemoveComment = async () => {
  if (window.confirm($t.confirm)) {
    const { message } = await useCustomFetch(`team/comment/delete`, {
      body: { team_id: teamController.activeTeamId, comment_id: props.data.id },
      method: 'POST',
    });

    if (message) {
      if (props.isBlocks) {
        // Удаляем комментарий из массива
        commentsController.removeComment(props.data.id);
      } else {
        // Удаляем комментарий из массива
        commentsController.removeCommentPopup(props.data.id);
      }
      // Убраем попап
      isShowPopup.value = false;
    }
  }
};

// Установить редактирование комментария
const setEditComment = () => {
  const divInput = document.querySelector('.div_input');
  const divInput2 = document.querySelector('.div_input2');
  console.log(divInput2.innerHTML);

  if (!props.isBlocks) {
    if (divInput instanceof HTMLElement) {
      // Вставляем текст комментария в поле ввода
      divInput.innerHTML = JSON.parse(props.data.text);
    }
    // Изменяем комментарий в массиве
    commentsController.changeEditComment(props.data);
    // Устанавливаем фокус в поле ввода
    commentsController.onFocus(divInput);
  } else {
    if (divInput2 instanceof HTMLElement) {
      // Вставляем текст комментария в поле ввода
      divInput2.innerHTML = JSON.parse(props.data.text);
      console.log(JSON.parse(props.data.text));
    }
    // Изменяем комментарий в массиве
    commentsController.changeEditCommentPopup(props.data);
    // Устанавливаем фокус в поле ввода
    commentsController.onFocus(divInput2);
  }
  // Убраем попап
  isShowPopup.value = false;
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.comment {
  position: relative;
  &:not(:last-child) {
    margin-bottom: 25px;
  }
}

.info {
  font-size: 14px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  .user {
    color: $blue;
    margin-right: 5px;
  }
  .date {
    color: $gray;
  }
}

.fa-ellipsis-h {
  cursor: pointer;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  right: 0;
}

.popup {
  z-index: 100;
  user-select: none;
  width: auto;
  right: 0;
  top: 15px;
  padding: 10px 0;
  li {
    cursor: pointer;
    padding: 5px 12px;
    &:hover {
      button {
        color: $blue;
      }
    }
    button {
      transition: 0.2s;
      color: $gray;
    }
  }
}
</style>
