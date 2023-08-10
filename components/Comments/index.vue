<template>
  <!-- Поле ввода -->
  <CommentsField :isBlocks="props.isBlocks" />

  <!-- Список комментариев -->
  <CommentsComment
    v-for="comment in comments"
    :key="comment.id"
    :data="comment"
    :isBlocks="props.isBlocks"
  />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCommentsStore } from '~/stores/CommentsController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isBlocks?: boolean;
}>();

/**
 * Переменные ----------------
 */
const commentsController = useCommentsStore();
const comments = computed(() => {
  return props.isBlocks
    ? commentsController.commentsPopup
    : commentsController.comments;
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
