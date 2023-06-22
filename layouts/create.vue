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
      <li class="extra__item" v-if="props.type === 'post'">
        <svg-icon name="tag" />
        <p>Тэги</p>
      </li>
    </ul>

    <!-- Кнопки -->
    <div class="btns">
      <!-- Кнопка отпраки -->
      <button @click="onSubmit" class="btn" :class="{ disabled: isLoading }">
        Опубликовать
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
        placeholder="Заголовок раздела"
      />
    </div>

    <!-- Тело элемента -->
    <div class="input">
      <Editor @data-change="setBodyValue" :initialValue="bodyValue" />
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { OutputBlockData } from '@editorjs/editorjs';
import { SectionScheme } from '~/utils/validation';
import { useUserStore } from '~/stores/UserStore';
import { useTeamStore } from '~/stores/TeamStore';
import Select from '~/components/UI/Select.vue';
import Warning from '~/components/UI/Warning.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import Editor from '~/components/Editor/index.vue';
import { TSection } from '~/api/models/section';

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
const route = useRoute(); // Роуте
const userStore = useUserStore(); // Хранилище пользователя
const teamStore = useTeamStore(); // Хранилище активной компании
const id = Number(route.params.id); // Id для элемента

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type: 'post' | 'section';
  isEdit?: boolean;
}>();

/**
 * Получение данных ----------------
 */
// Разделы для списка
const { data: sections } = useAsyncData(async () => {
  const { data } = await Api().section.getAll(teamStore.activeTeam?.team.id);
  return data;
});

/**
 * Пользовательские переменные ----------------
 */
const titleValue = ref(''); // Заголовок элемента
const bodyValue = ref<OutputBlockData[]>([]); // Тело элемента
const selectValue = ref<TSection | null>(null); // Селект элемента

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, isLoading, validateForm } = useFormValidation();
// Предупреждение прежде чем покинуть страницу
onBeforeRouteLeave((to, from, next) => {
  if (to.path.includes('/posts/') || to.path.includes('/sections/')) {
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
// Установление значения тела элемента (событие)
const setBodyValue = (value: OutputBlockData[]) => {
  bodyValue.value = value;
};
// Метод создания или редактирования элемента
const onSubmit = async () => {
  // Объект с данными
  const dto = {
    team_id: teamStore.activeTeam?.team.id,
    name: titleValue.value,
    description: JSON.stringify(bodyValue.value),
    ...(selectValue.value && { section_id: selectValue.value.id }),
  };
  // Вызываем хук для обрабоки формы
  validateForm(dto, SectionScheme, async () => {
    // Создаем раздел
    const { data } = await Api().section.add(dto);
    // Перенапрвляем пользователя на страницу раздела
    await router.push(`${teamStore.activeTeamId}/sections/${data.id}`);
  });
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
</style>
