<template>
  <!-- Поле ввода -->
  <div class="field">
    <div class="input">
      <UIInput label="Добавить комментарий" v-model="commentValue" />
      <svg-icon
        name="submit"
        class="submit"
        :class="{ disabled: requestController.loading[url] }"
        v-if="commentValue"
        @click="createComment"
      />
    </div>
  </div>

  <!-- Список комментариев -->
  <CommentsComment
    v-for="comment in comments"
    :key="comment.id"
    :data="comment"
  />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useRequestStore } from '~/stores/RequestController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { TComment } from '~/utils/types/comment';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  comments: TComment[];
}>();

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const requestController = useRequestStore(); // Хранилище запроса
const teamController = useTeamStore(); // Хранилище бкоманд

/**
 * Пользовательские переменные ----------------
 */
const url = 'team/comment/add'; // URL запроса
const commentValue = ref(''); // Значение поля ввода
const comments = ref(props.comments || []); // Список комментариев

/**
 * Методы ----------------
 */
// Создать комментарий
const createComment = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    entity_type: 'article',
    entity_id: route.params.id,
    comment: commentValue.value,
  };

  const { data } = await useCustomFetch<TComment>(url, {
    body: dto,
    method: 'POST',
  });

  if (data.value) {
    commentValue.value = '';
    comments.value.push(data.value);
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.field {
  margin-bottom: 35px;
}
.input {
  position: relative;
  .submit {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background-color: rgba($blue, 0.1);
    padding: 8px;
    transition: 0.3s;
    cursor: pointer;
    border-radius: 2px;
    &:hover {
      background-color: rgba($blue, 0.2);
    }
  }
}
</style>
