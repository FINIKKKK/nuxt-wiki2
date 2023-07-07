<template>
  <!-- Поле ввода -->
  <div class="field">
    <div class="input">
      <UIInput
        label="Добавить комментарий"
        v-model="commentValue"
        @keydown.enter="createOrEditComment"
      />
      <div class="btns">
        <svg-icon
          :name="editComment ? 'edit' : 'submit'"
          class="svg-btn submit"
          :class="{ disabled: requestController.loading[url] }"
          v-if="commentValue"
          @click="createOrEditComment"
          title="Редактировать комментарий"
        />
        <svg-icon
          name="close"
          class="svg-btn close"
          v-if="editComment"
          @click="cancelEdit"
          title="Отменить редактирование"
        />
      </div>
    </div>

    <div class="users">
      <User
        v-for="user in users.employees"
        :key="user"
        :data="user"
        className="comment"
        @click="() => selectUser(user)"
      />
    </div>
  </div>

  <!-- Список комментариев -->
  <CommentsComment
    v-for="comment in comments"
    :key="comment.id"
    :data="comment"
    @removeComment="removeComment"
    @setEditComment="setEditComment"
  />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useRequestStore } from '~/stores/RequestController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { TComment } from '~/utils/types/comment';
import { TUser } from '~/utils/types/account';

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
const editComment = ref<TComment | null>(null); // Это редактироварние комментария?

/**
 * Получение данных ----------------
 */
// Пользователи
const { data: users } = await useCustomFetch(`team/employees`, {
  query: { team_id: teamController.activeTeamId },
});

/**
 * Методы ----------------
 */
// Создать комментарий
const createOrEditComment = async () => {
  // Создание комментария
  if (!editComment.value) {
    const { data } = await useCustomFetch<TComment>(url, {
      body: {
        team_id: teamController.activeTeamId,
        entity_type: 'article',
        entity_id: route.params.id,
        comment: commentValue.value,
      },
      method: 'POST',
    });

    if (data.value) {
      commentValue.value = '';
      comments.value.push(data.value);
    }
  } else {
    const { data } = await useCustomFetch<TComment>('team/comment/edit', {
      body: {
        team_id: teamController.activeTeamId,
        comment_id: editComment.value?.id,
        comment: commentValue.value,
      },
      method: 'POST',
    });
    console.log(data.value);

    if (data.value) {
      commentValue.value = '';
      comments.value = comments.value.map((obj) =>
        editComment.value === obj.id ? data.value : obj,
      );
    }
  }
};
// Удалить комментарий из списка (событие)
const removeComment = (id: number) => {
  comments.value = comments.value.filter((obj) => obj.id !== id);
};
// Редактировать комментарий (событие)
const setEditComment = (comment: TComment) => {
  commentValue.value = comment.text;
  editComment.value = comment;
};
// Отменить редактирование
const cancelEdit = () => {
  editComment.value = null;
  commentValue.value = '';
};
// Выбрать пользователя
const selectUser = (user: TUser) => {
  commentValue.value += `${user.fullname} `;
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
  .btns {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .svg-btn {
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
  .close {
    margin-left: 8px;
  }
}

.users {
  background-color: $bg;
  max-width: 200px;
}
</style>