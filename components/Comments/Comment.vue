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
    <p class="text">{{ props.data.text }}</p>

    <!-- Попап с кнопками -->
    <div class="extra" ref="popupRef">
      <i class="fa-regular fa-ellipsis-h" @click="isShowPopup = !isShowPopup" />

      <ul class="popup" v-if="isShowPopup">
        <li>
          <button @click="setEditComment">{{ $t.edit }}</button>
        </li>
        <li>
          <button @click="onRemoveComment">{{ $t.delete }}</button>
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
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCommentsStore } from '~/stores/CommentsController';
import { useUserStore } from '~/stores/UserController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TComment;
  type?: 'block';
}>();

/**
 * Переменные ----------------
 */
const popupRef = ref(null);
const isShowPopup = ref(false);
const teamController = useTeamStore();
const commentsController = useCommentsStore();
const userController = useUserStore();
const $t = await useTranslate('comments');

/**
 * Хуки ----------------
 */
useOutsideClick(popupRef, isShowPopup);

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
      if (props.type !== 'block') {
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
  if (props.type !== 'block') {
    // Вставляем текст комментария в поле ввода
    commentsController.changeFieldValue(props.data.text);
    // Изменяем комментарий в массиве
    commentsController.changeEditComment(props.data);
  } else {
    // Вставляем текст комментария в поле ввода
    commentsController.changeFieldValuePopup(props.data.text);
    // Изменяем комментарий в массиве
    commentsController.changeEditCommentPopup(props.data);
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
