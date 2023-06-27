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
      <li class="extra__item" @click="isShowTags = !isShowTags">
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

    <!-- Тело элемента -->
    <div class="tabs__flex">
      <div class="field">
        <input
          v-model="tabNameValue"
          type="text"
          placeholder="Добавить вкладку"
          @keydown.enter="addTab"
          maxlength="100"
        />
      </div>
      <ul class="tabs">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab.name }}
        </li>
      </ul>
    </div>

    <div class="body">
      <template v-for="(tab, index) in tabs">
        <div class="input" v-if="activeTab === index">
          <Editor class="editor" v-model="tab.content" />
        </div>
      </template>
    </div>

    <div class="tags" :class="{ active: isShowTags }">
      <h2>Метки</h2>
      <p>
        itl.wiki создана для совместной работы, делитесь контентом, который вы
        создаете, с вашей командой.
      </p>
      <UIInput
        label="Введиде название метки"
        v-model="tagsValue"
        :errors="[]"
        @keydown.enter="addTag"
        @input="searchTag"
      />
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { ArticleScheme, SectionScheme } from '~/utils/validation';
import { useUserStore } from '~/stores/UserStore';
import { useTeamStore } from '~/stores/TeamStore';
import Select from '~/components/UI/Select.vue';
import Warning from '~/components/UI/Warning.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import Editor from '~/components/Editor/index.vue';
import { TSection } from '~/api/models/section';
import Input from '~/components/UI/Input.vue';
import { useCustomFetch } from '~/hooks/useCustomFetch';

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
const activeTab = ref(0); //
const tabNameValue = ref(''); //
const tabs = ref([]);
const tagsValue = ref(''); //
const isShowTags = ref(true); //
const tags = ref([]); //

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
const searchTag = async () => {
  const dto = {
    team_id: teamStore.activeTeam.team.id,
    query: tagsValue.value,
  };
  const { data } = await useCustomFetch('team/settings/tags/find', { body: dto, method: 'POST' });
  console.log(data);
};
const addTag = async () => {
  const dto = {
    team_id: teamStore.activeTeam.team.id,
    name: tagsValue.value,
  };
  const { data } = await useCustomFetch('team/settings/tags/add', {
    body: dto,
    method: 'POST',
  });
  tagsValue.value = '';
  tags.value.push(data);
};
const addTab = () => {
  if (tabNameValue.value) {
    tabs.value.push({ name: tabNameValue.value, content: '' });
    tabNameValue.value = '';
  }
};
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
      color: $blue2;
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

.tabs__flex {
  margin-bottom: 40px;
}

.tabs {
  width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  margin-top: 25px;
  &::-webkit-scrollbar {
    height: 2px;
  }
  li {
    border-bottom: 1px solid $gray;
    text-transform: uppercase;
    padding: 5px 15px;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    font-size: 13px;
    color: $gray;
    &.active {
      color: $blue;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        background-color: $blue;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
      }
    }
  }
}

.editor {
  border-radius: 10px;
}

.field {
  position: relative;
  width: 280px;
  margin-right: 50px;
  input {
    width: 100%;
    &::placeholder {
      color: $gray;
    }
  }
  .submit {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
}

.tags {
  position: fixed;
  right: 0;
  top: 0;
  background-color: $white;
  padding: 50px 35px;
  min-height: 100vh;
  overflow: auto;
  width: 400px;
  z-index: 100;
  box-shadow: 0 0 10px rgba($blue, 0.3);
  transform: translateX(100%);
  transition: 0.3s;
  &.active {
    transform: translateX(0);
  }
  h2 {
    font-size: 24px;
    margin-bottom: 25px;
  }
  p {
    margin-bottom: 25px;
  }
}
</style>
