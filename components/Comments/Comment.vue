<template>
  <div class="comment">
    <!-- Информация о комментарие -->
    <div class="info">
      <div class="user">{{ props.data.creator.fullname }}</div>
      <div class="date">{{ useFormatDate(props.data.created_at) }}</div>
    </div>

    <!-- Текст комментария -->
    <p class="text">{{ props.data.text }}</p>

    <!-- Попап с кнопками -->
    <div class="extra" ref="popupRef">
      <svg-icon
        name="options"
        class="options"
        @click="isShowPopup = !isShowPopup"
      />

      <ul class="popup" v-if="isShowPopup">
        <li>
          <button @click="setEditComment">Редактировать комментарий</button>
        </li>
        <li>
          <button @click="removeComment">Удалить комментарий</button>
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

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TComment;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['removeComment', 'setEditComment']);

/**
 * Пользовательские переменные ----------------
 */
const popupRef = ref(null); // Ref-ссылка на попап управления комментария
const isShowPopup = ref(false); // Показывать попап?
const teamController = useTeamStore(); // Хранилище команд

/**
 * Хуки ----------------
 */
useOutsideClick(popupRef, isShowPopup);

/**
 * Методы ----------------
 */
// Удалить комментарий
const removeComment = async () => {
  const data = await useCustomFetch(`team/comment/delete`, {
    body: { team_id: teamController.activeTeamId, comment_id: props.data.id },
    method: 'POST',
  });
  if (data) {
    emits('removeComment', props.data.id);
    isShowPopup.value = false;
  }
};
// Редактировать комментарий
const setEditComment = () => {
  emits('setEditComment', props.data);
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

.options {
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
