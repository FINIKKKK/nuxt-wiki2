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
      <li class="extra__item" v-if="props.type === 'article'">
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
    <ul class="tabs">
      <li
        v-for="(item, index) in 2"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ `Вкладка ${index + 1}` }}
      </li>
    </ul>
    <div class="body">
      <div class="input" v-if="activeTab === 0">
        <Editor @data-change="setBodyValue1" :initialValue="bodyValue1" />
      </div>
      <div class="input" v-if="activeTab === 1">
        <Editor @data-change="setBodyValue2" :initialValue="bodyValue2" />
      </div>
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

/**
 * Пользовательские переменные ----------------
 */
const titleValue = ref(''); // Заголовок элемента
const selectValue = ref<TSection | null>(null); // Селект элемента
const bodyValue1 = ref<OutputBlockData[]>([]); // Тело элемента
const bodyValue2 = ref<OutputBlockData[]>([]); // Тело элемента
const activeTab = ref(0); //

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
// Установление значения тела элемента (событие)
const setBodyValue1 = (value: OutputBlockData[]) => {
  bodyValue1.value = value;
};
const setBodyValue2 = (value: OutputBlockData[]) => {
  bodyValue2.value = value;
};
// Метод создания или редактирования элемента
const onSubmit = async () => {
  // Изменяем или создаем раздел
  if (props.isEdit) {
    // Объект с данными
    const dto = {
      team_id: teamStore.activeTeam?.team.id,
      section_id: id,
      name: titleValue.value,
      description: JSON.stringify(bodyValue.value),
      ...(selectValue.value && { parent_id: selectValue.value.id }),
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

.tabs {
  display: flex;
  align-items: center;
  margin-top: -25px;
  margin-bottom: 25px;
  li {
    &:not(:last-child) {
      margin-right: 15px;
    }
    &.active {
      color: $blue;
    }
  }
}
</style>
