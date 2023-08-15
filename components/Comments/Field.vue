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
        :className="props.isBlocks ? 'div_input2' : 'div_input'"
        @handleInput="handleInput"
        @keydown.enter.prevent="false"
        v-model="model"
        ref="refInput"
      >
        <template #btn2 v-if="model" title="Редактировать комментарий">
          <i
            :class="`fa-regular fa-${
              commentsController.editComment ||
              commentsController.editCommentPopup
                ? 'edit'
                : 'paper-plane'
            } ${'disabled' && requestController.loading[url]}`"
          />
        </template>
        <template
          #btn3
          v-if="
            props.isBlocks
              ? commentsController.editCommentPopup
              : commentsController.editComment
          "
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
import { useElemStore } from '~/stores/ElemController';
import Echo from 'laravel-echo';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isBlocks?: boolean;
}>();

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
const refPopup = ref(null);
const elemController = useElemStore();

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
 * Вычисляемое ----------------
 */
// Значение поля
const model = computed(() => {
  return props.isBlocks
    ? commentsController.fieldValuePopup
    : commentsController.fieldValue;
});

/**
 * Методы ----------------
 */
// Выбрать пользователя из списка
const selectUser = (user: TUser) => {
  // Добавляем новый span
  const newSpan = document.createElement('span');
  newSpan.textContent = `@${user.fullname} `;
  newSpan.classList.add('input-span');
  newSpan.contentEditable = 'false';

  if (props.isBlocks) {
    const divInput2 = document.querySelector('.div_input2');
    if (!divInput2) return false;
    const currentValue2 = divInput2.childNodes;

    // Удаляем последний символ, если он символ "@"
    if (currentValue2.length > 0) {
      const lastNode = currentValue2[currentValue2.length - 1];
      if (lastNode.nodeType === Node.TEXT_NODE) {
        if (lastNode.textContent)
          lastNode.textContent = lastNode.textContent.slice(0, -1);
      }
    }
    // Добавляем новый span
    divInput2.appendChild(newSpan);
    // Сохраняем в хранилище
    commentsController.changeFieldValuePopup(divInput2.innerHTML);
    // Ставим фокус
    divInput2 && commentsController.onFocus(divInput2 as HTMLDivElement);
  } else {
    const divInput = document.querySelector('.div_input');
    if (!divInput) return false;
    const currentValue = divInput.childNodes;

    // Удаляем последний символ, если он символ "@"
    if (currentValue.length > 0) {
      const lastNode = currentValue[currentValue.length - 1];
      if (lastNode.nodeType === Node.TEXT_NODE) {
        if (lastNode.textContent)
          lastNode.textContent = lastNode.textContent.slice(0, -1);
      }
    }
    // Добавляем новый span
    divInput.appendChild(newSpan);
    // Сохраняем в хранилище
    commentsController.changeFieldValue(divInput.innerHTML);
    // Ставим фокус
    divInput && commentsController.onFocus(divInput as HTMLDivElement);
  }

  // Убираем попап
  isShowUsers.value = false;
};

// Показывать popup при вводе специльных символов
const handleInput = (e: any) => {
  if (e && e.target) {
    props.isBlocks
      ? commentsController.changeFieldValuePopup(e.target?.innerHTML)
      : commentsController.changeFieldValue(e.target?.innerHTML);

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
    ...(props.isBlocks && {
      tab_id: elemController.activeTab.id,
      block_id: elemController.blockId,
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

    window.Echo.private(`comment.${data.id}`).listen(
      'App\Events\Comments\Added',
      (e: any) => {
        console.log('CommentEvent:', e);
      },
    );

    if (data) {
      // Очищаем поле
      commentsController.clearInput(props.isBlocks);
      // Добавляем в массив комментарий
      if (props.isBlocks) commentsController.addCommentPopup(data);
      else commentsController.addComment(data);
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
      commentsController.clearInput(props.isBlocks);
      // Изменяем комментарий в массиве
      if (props.isBlocks) commentsController.updateComments(data);
      else commentsController.updateCommentsPopup(data);
    }
  }
};

// Отменить редактирование
const cancelEdit = () => {
  commentsController.changeEditComment(null);
  commentsController.clearInput(props.isBlocks);
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
