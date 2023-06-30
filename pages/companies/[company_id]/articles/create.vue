<template>
  <!--------------------------------------
  Элементы управления 
  ---------------------------------------->
  <div class="controls">
    <!-- Дополнительные элементы -->
    <ul class="extra">
      <!-- Доступ -->
      <li class="extra__item">
        <svg-icon name="lock" />
        <p>Доступ</p>
      </li>
      <!-- Тэги -->
      <li
        class="extra__item"
        :ref="tagsBtnRef"
        @click="isShowTags = !isShowTags"
      >
        <svg-icon name="tag" />
        <p>Тэги</p>
      </li>
    </ul>

    <!-- Кнопки -->
    <div class="btns">
      <!-- Кнопка отпраки -->
      <button @click="onSubmit" class="btn" :class="{ disabled: isLoading }">
        {{ labelBtn }}
      </button>
      <!-- Кнопка отмены -->
      <NuxtLink :to="`${teamStore.activeTeamId}`" class="btn btn2"
        >Отменить
      </NuxtLink>
    </div>
  </div>

  <!--------------------------------------
    Ошибки
  ---------------------------------------->
  <Warning
    v-if="Object.values(errorsValidate).flat().length"
    :errors="Object.values(errorsValidate).flat() as string[]"
    class="warning"
  />

  <!--------------------------------------
  Форма создания
  ---------------------------------------->
  <div class="form">
    <!-- Селект элемента -->
    <Select :options="sections" v-model="selectValue" class="select" />

    <!-- Заголовок элемента -->
    <div class="input">
      <input
        v-model="titleValue"
        class="title"
        type="text"
        placeholder="Заголовок статьи"
      />
    </div>

    <!-- Табы -->
    <EditorTabs v-model="tabs" />

    <!-- Тэги -->
    <Tags :active="isShowTags" v-model="tags" />
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { ArticleScheme, SectionScheme } from '~/utils/validation';
import { useUserStore } from '~/stores/UserController';
import { useTeamStore } from '~/stores/TeamContoller';
import Select from '~/components/UI/Select.vue';
import Warning from '~/components/UI/Warning.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import Editor from '~/components/Editor/index.vue';
import { TSection } from '~/api/models/section';
import Input from '~/components/UI/Input.vue';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { TTab } from '~/utils/types/article';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type: 'article' | 'section';
  isEdit?: boolean;

  data?: TSection;
}>();

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
const route = useRoute(); // Роуте
const userStore = useUserStore(); // Хранилище пользователя
const teamStore = useTeamStore(); // Хранилище активной компании
const id = Number(route.params.id); // Id для элемента
const tags = ref<number[]>([]); //

/**
 * Получение данных ----------------
 */
// Разделы для списка
const { data: sections } = useAsyncData(async () => {
  const { data } = await Api().section.getAll(teamStore.activeTeam?.team.id);
  return data;
});
const { data: article } = useAsyncData(async () => {
  const dto = {
    team_id: teamStore.activeTeam?.team.id,
    article_id: route.params.id,
  };
  const { data } = await Api().article.editGet(dto);
  return data;
});

/**
 * Пользовательские переменные ----------------
 */
const titleValue = ref(''); // Заголовок элемента
const selectValue = ref<TSection | null>(null); // Селект элемента

const tabs = ref<TTab[]>([]);
const isShowTags = ref(false); //

/**
 * Вычисляемые значения ----------------
 */
// Label кнопки
const labelBtn = computed(() => {
  if (props.isEdit) {
    return 'Изменить';
  } else {
    return 'Опубликовать';
  }
});

// useOutsideClick(tagsRef, isShowTags, () => {});

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, isLoading, validateForm } = useFormValidation();
// Предупреждение прежде чем покинуть страницу
onBeforeRouteLeave((to, from, next) => {
  if (to.path.includes('/articles/') || to.path.includes('/sections/')) {
    next();
  } else {
    if (confirm('Вы уверены, что хотите покинуть эту страницу?')) {
      next();
    } else {
      next(false);
    }
  }
});

/**
 * Методы ----------------
 */
// Метод создания или редактирования элемента
const onSubmit = async () => {
  // Изменяем или создаем раздел
  if (props.isEdit) {
    // Объект с данными
    const dto = {
      team_id: teamStore.activeTeam?.team.id,
      name: titleValue.value,
      tabs: tabs.value,
      section_id: selectValue.value?.id,
    };

    // Вызываем хук для обрабоки формы
    validateForm(dto, SectionScheme, async () => {
      // Изменяем раздел
      const { data } = await Api().section.edit(dto);
      // Перенапрвляем пользователя на страницу раздела
      // await router.push(`${teamStore.activeTeamId}/sections/${id}`);
    });
  } else {
    // Объект с данными
    const dto = {
      team_id: teamStore.activeTeam?.team.id,
      name: titleValue.value,
      tabs: tabs.value,
      section_id: selectValue.value?.id,
      action: 3,
    };
    // Вызываем хук для обрабоки формы
    validateForm(dto, ArticleScheme, async () => {
      // Создаем раздел
      const { data } = await Api().article.add(dto);
      console.log(data);
      // Перенапрвляем пользователя на страницу раздела
      // await router.push(`${teamStore.activeTeamId}/articles/${data.id}`);
    });
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 900px;
  margin: 0 auto;
  padding-top: 60px;
  .input {
    &:not(:last-child) {
      margin-bottom: 36px;
    }
  }
  .title {
    width: 100%;
    font-size: 24px;
    line-height: 28px;
    &::placeholder {
      color: $gray;
    }
  }
}

.controls {
  padding: 17px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.extra {
  user-select: none;
  display: flex;
  align-items: center;
  &__item {
    &:not(:last-child) {
      margin-right: 35px;
    }
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      width: 14px;
      height: 14px;
      margin-right: 14px;
    }
    &:hover {
      color: $blue;
    }
  }
}

.btns {
  display: flex;
  align-items: center;
  .btn {
    padding: 10px 15px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  .options {
    width: 20px;
    height: 20px;
  }
}

.warning {
  padding: 20px 100px;
}
</style>
