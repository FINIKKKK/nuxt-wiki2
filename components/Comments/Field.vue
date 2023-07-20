<template>
  <div class="field">
    <div class="input">
      <UIInput
        label="Добавить комментарий"
        :isTextarea="true"
        :limit="350"
        v-model="commentsController.fieldValue"
        @btnClick="createOrEditComment"
        @btnClick2="cancelEdit"
        class="comment_input"
      >
        <template
          #btn2
          v-if="commentsController.fieldValue"
          title="Редактировать комментарий"
        >
          <i
            :class="`fa-regular fa-${
              commentsController.editComment ? 'edit' : 'paper-plane'
            } ${'disabled' && requestController.loading[url]}`"
          />
        </template>
        <template
          #btn3
          v-if="commentsController.editComment"
          title="Отменить редактирование"
        >
          <i
            class="fa-regular fa-remove"
            :class="{ disabled: requestController.loading[url] }"
          />
        </template>
      </UIInput>
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
import { TEmployees } from '~/utils/types/team';

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

    if (data) {
      // Очищаем поле
      commentsController.changeFieldValue('');
      // Добавляем в массив комментарий
      commentsController.addComment(data);
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
    console.log(data);

    if (data) {
      // Очищаем поле
      commentsController.changeFieldValue('');
      // Изменяем комментарий в массиве
      commentsController.updateComments(data);
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
  max-height: 200px;
}
</style>

<style lang="scss">
.comment_input {
  .inner .flex {
    align-items: flex-start !important;
  }
}

.users {
  .user {
    padding: 7px 10px;
    .avatar,
    img {
      font-size: 10px;
      line-height: 14px;
      width: 25px;
      height: 25px;
    }
  }
  p {
    font-size: 14px;
  }
}
</style>
