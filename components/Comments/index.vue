<template>
  <!-- Поле ввода -->
  <CommentsField />

  <!-- Список комментариев -->
  <CommentsComment
    v-for="comment in commentsController.comments"
    :key="comment.id"
    :data="comment"
  />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCommentsStore } from '~/stores/CommentsController';

/**
 * Переменные ----------------
 */
const commentsController = useCommentsStore();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
