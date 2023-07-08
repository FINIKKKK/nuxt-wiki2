<template>
  <div class="field">
    <div class="input">
      <UITextarea
        label="Добавить комментарий"
        v-model="commentsController.fieldValue"
      />
      <div class="btns">
        <svg-icon
          :name="commentsController.editComment ? 'edit' : 'submit'"
          class="svg-btn submit"
          :class="{ disabled: requestController.loading[url] }"
          v-if="commentsController.fieldValue"
          @click="createOrEditComment"
          title="Редактировать комментарий"
        />
        <svg-icon
          name="close"
          class="svg-btn close"
          v-if="commentsController.editComment"
          @click="cancelEdit"
          title="Отменить редактирование"
        />
      </div>
    </div>

    <div class="users">
      <User
        v-for="user in users.employees"
        :key="user.id"
        :data="user"
        className="comment"
        @click="() => selectUser(user)"
      />
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useRequestStore } from '~/stores/RequestController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TComment } from '~/utils/types/comment';
import { TUser } from '~/utils/types/account';
import { useCommentsStore } from '~/stores/CommentsController';
import {TEmployees} from "~/utils/types/team";

/**
 * Переменные ----------------
 */
const route = useRoute();
const requestController = useRequestStore();
const teamController = useTeamStore();
const commentsController = useCommentsStore();
const url = 'team/comment/add';

/**
 * Получение данных ----------------
 */
const { data: users } = await useCustomFetch<TEmployees>(`team/employees`, {
  query: { team_id: teamController.activeTeamId },
});

/**
 * Методы ----------------
 */
const createOrEditComment = async () => {
  // ------------------------------------
  // Создаем комментарий
  // ------------------------------------
  if (!commentsController.editComment) {
    const { data } = await useCustomFetch<TComment>(url, {
      body: {
        team_id: teamController.activeTeamId,
        entity_type: 'article',
        entity_id: route.params.id,
        comment: commentsController.fieldValue,
      },
      method: 'POST',
    });

    if (data.value) {
      // Очищаем поле
      commentsController.changeFieldValue('');
      // Добавляем в массив комментарий
      commentsController.addComment(data.value);
    }
  }
  // ------------------------------------
  // Редактируем комментарий
  // ------------------------------------
  else {
    const { data } = await useCustomFetch<TComment>('team/comment/edit', {
      body: {
        team_id: teamController.activeTeamId,
        comment_id: commentsController.editComment?.id,
        comment: commentsController.fieldValue,
      },
      method: 'POST',
    });
    console.log(data.value);

    if (data.value) {
      // Очищаем поле
      commentsController.changeFieldValue('');
      // Изменяем комментарий в массиве
      commentsController.updateComments(data.value);
    }
  }
};

const selectUser = (user: TUser) => {
  commentsController.changeFieldValue(
    (commentsController.fieldValue += `${user.fullname} `),
  );
};

const cancelEdit = () => {
  commentsController.changeEditComment(null);
  commentsController.changeFieldValue('');
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
