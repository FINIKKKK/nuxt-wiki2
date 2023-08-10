<template>
  <div class="field">
    <!--------------------------------------
     Поле ввода
    ---------------------------------------->
    <div class="input">
      <UIInput
        label="Добавить комментарий"
        :limit="350"
        @btnClick="createOrEditComment"
        @btnClick2="cancelEdit"
        class="comment_input"
        @input="handleInput"
        type_input="div"
        @handleInput="handleInput"
        @keydown.enter.prevent="false"
        v-model="commentsController.fieldValue"
        ref="refInput"
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

    <!--------------------------------------
     Список пользователей
    ---------------------------------------->
    <div class="users popup" v-if="isShowUsers" ref="refPopup">
      {{ (popupTop, popupLeft) }}
      <User
        v-for="user in teamController.teamEmployees"
        :key="user.id"
        :data="user"
        className="comment"
        @click="() => selectUser(user)"
        @keydown.enter="() => selectUser(user)"
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
const isShowUsers = ref(false);
const refInput = ref(null);
const refPopup = ref();

/**
 * Получение данных ----------------
 */
// Работники
if (!teamController.employees) {
  const { data: employees } = await useCustomFetch<TEmployees>(
    `team/employees`,
    {
      query: { team_id: teamController.activeTeamId },
    },
  );
  teamController.setEmployees(employees);
}

/**
 * Методы ----------------
 */
// Выбрать пользователя из списка
const selectUser = (user: TUser) => {
  const divInput = document.querySelector('.div_input');
  const currentValue = divInput.childNodes;

  // Удаляем последний символ, если он символ "@"
  if (currentValue.length > 0) {
    const lastNode = currentValue[currentValue.length - 1];
    if (lastNode.nodeType === Node.TEXT_NODE) {
      lastNode.textContent = lastNode.textContent.slice(0, -1);
    }
  }

  // Добавляем новый span
  const newSpan = document.createElement('span');
  newSpan.textContent = `@${user.fullname} `;
  newSpan.classList.add('input-span');
  newSpan.contentEditable = 'false';
  divInput.appendChild(newSpan);

  // Сохраняем в хранилище
  commentsController.changeFieldValue(divInput.innerHTML);

  // Убираем попап и ставим фокус
  isShowUsers.value = false;
  commentsController.onFocus();
};

// Показывать popup при вводе специльных символов
const handleInput = (e: any) => {
  if (e && e.target) {
    commentsController.changeFieldValue(e.target?.innerHTML);

    if (e.target?.textContent?.slice(-2) === ' @') {
      isShowUsers.value = true;
    } else {
      isShowUsers.value = false;
    }
  }
};

// Создать или изменить комментарий
const createOrEditComment = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    entity_type: 'article',
    entity_id: route.params.id,
    comment: JSON.stringify(commentsController.fieldValue),
    ...(commentsController.editComment && {
      comment_id: commentsController.editComment?.id,
    }),
  };

  // ------------------------------------
  // Создаем комментарий
  // ------------------------------------
  if (!commentsController.editComment) {
    const { data } = await useCustomFetch<TComment>(url, {
      body: dto,
      method: 'POST',
    });

    if (data) {
      // Очищаем поле
      commentsController.clearInput();
      // Добавляем в массив комментарий
      commentsController.addComment(data);
    }
  }
  // ------------------------------------
  // Редактируем комментарий
  // ------------------------------------
  else {
    const { data } = await useCustomFetch<TComment>('team/comment/edit', {
      body: dto,
      method: 'POST',
    });
    console.log(data);

    if (data) {
      // Очищаем поле
      commentsController.clearInput();
      // Изменяем комментарий в массиве
      commentsController.updateComments(data);
    }
  }
};

// Отменить редактирование
const cancelEdit = () => {
  commentsController.changeEditComment(null);
  commentsController.clearInput();
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.field {
  margin-bottom: 35px;
  position: relative;
}

.input {
  .close {
    margin-left: 8px;
  }
}

.users {
  max-width: 200px;
  max-height: 200px;
  top: -70px;
  right: 0;
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
      line-height: 16px;
      width: 25px;
      height: 25px;
    }
  }
  p {
    font-size: 14px;
  }
}

.div-input {
  background-color: $blue3;
}

.input-span {
  color: $blue;
}

.custom-span-class {
  color: red;
  font-weight: bold;
}
</style>
