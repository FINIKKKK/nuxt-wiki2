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
          <button>Редактировать комментарий</button>
        </li>
        <li>
          <button>Удалить комментарий</button>
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

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TComment;
}>();

/**
 * Пользовательские переменные ----------------
 */
const popupRef = ref(null); // Ref-ссылка на попап управления комментария
const isShowPopup = ref(false); // Показывать попап?

/**
 * Хуки ----------------
 */
useOutsideClick(popupRef, isShowPopup);
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
  background-color: #0e65dd;
  position: absolute;
  top: 0;
  right: 0;
}

.popup {
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