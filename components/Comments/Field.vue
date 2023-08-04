<template>
  <div class="field">
    <div class="input">
      <UIInput
        label="Добавить комментарий"
        :limit="350"
        v-model="commentsController.fieldValue"
        @btnClick="createOrEditComment"
        @btnClick2="cancelEdit"
        class="comment_input"
        @input="handleInput"
        type_input="div"
        @handleInput="handleInput"
        @keydown.enter.prevent="false"
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

    <div
      class="users popup"
      v-if="isShowUsers"
      ref="refPopup"
    >
<!--      :style="{ top: popupTop, left: popupLeft }"-->
      <User
        v-for="user in teamController.teamEmployees"
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
const isShowUsers = ref(true);
const refDivContent = ref(null);
const refInput = ref(null);
const popupTop = ref(40);
const popupLeft = ref(20);
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
const selectUser = (user: TUser) => {
  const newSpan = document.createElement('span');
  newSpan.textContent = `@${user.fullname} `;
  newSpan.classList.add('input-span');
  newSpan.contentEditable = 'false';
  document.querySelector('.div_input').appendChild(newSpan);

  commentsController.changeFieldValue(
    `${commentsController.fieldValue} <span class="input-span">\`@${user.fullname} \`</span>`,
  );
  placeCursorAtEnd();
};

const placeCursorAtEnd = () => {
  const selection = window.getSelection();
  const range = document.createRange();
  const div = refDivContent.value;
  range.selectNodeContents(div);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  div.focus();
};
const lastInputCharacter = ref('');
const cursorPosition = ref(0);

/**
 *  ----------------
 */

const getInputCursorPosition = (input) => {
  const position = commentsController.fieldValue.indexOf('@');
  if (position !== -1) {
    const inputRect = input.getBoundingClientRect();
    const inputStyle = window.getComputedStyle(input);
    const left = inputRect.left + inputStyle.paddingLeft;
    const top =
        inputRect.top + inputRect.height + parseInt(inputStyle.paddingTop, 10);

    return { top, left };
  }
  return null;
};


const handleInput = (e: any) => {
  const popup = refPopup.value;
  const position = getInputCursorPosition(popup);
  console.log('position', position);
  // const { top, left } = position;
  //
  // // Устанавливаем координаты позиции для popup
  // popup.style.top = `${top}px`;
  // popup.style.left = `${left}px`;

  commentsController.fieldValue = e.target.textContent;

  const selection = window.getSelection();
  cursorPosition.value = selection.anchorOffset;

  const inputLength = e.data ? e.data.length : 0;
  if (inputLength > 0) {
    lastInputCharacter.value = e.data.charAt(inputLength - 1);
    if (lastInputCharacter.value === '@') {
      isShowUsers.value = true;
    } else {
      isShowUsers.value = false;
    }
  } else {
    lastInputCharacter.value = '';
    isShowUsers.value = false;
  }

  // Функция для получения позиции текущего символа @
};
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
        comment: JSON.stringify(document.querySelector('.div_input').innerHTML),
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
        comment: JSON.stringify(refDivContent.value.innerHTML),
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
  position: relative;
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
  max-width: 200px;
  max-height: 200px;
  top: 40px;
  right: auto;
  left: 20px;
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
