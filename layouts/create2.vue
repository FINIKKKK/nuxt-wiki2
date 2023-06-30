<template>
  <!--------------------------------------
    Элементы управления
  ---------------------------------------->
  <CreatePageControls :type="props.type" :isEdit="props.isEdit" />

  <!--------------------------------------
    Ошибки
  ---------------------------------------->
<!--  <UIWarning-->
<!--    v-if="Object.values(errorsValidate).flat().length"-->
<!--    :errors="Object.values(errorsValidate).flat() as string[]"-->
<!--    class="warning"-->
<!--  />-->

  <!--------------------------------------
    Форма создания
  ---------------------------------------->
  <div class="form">
    <!-- Селект элемента -->
    <UISelect :options="sections" v-model="selectValue" class="select" />

    <!-- Заголовок элемента -->
    <div class="input">
      <input
        v-model="titleValue"
        class="title"
        type="text"
        placeholder="Заголовок статьи"
      />
    </div>

    <!-- Слот -->
    <slot />
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useCreateElemStore } from '~/stores/CreateElemController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type: 'article' | 'section';
  isEdit?: boolean;
}>();

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
const teamController = useTeamStore(); // Хранилище активной компании
const createElemController = useCreateElemStore(); // Хранилище страницы создания

/**
 * Пользовательские переменные ----------------
 */
const titleValue = ref(''); // Значение заголовка
const selectValue = ref(null); // Значение селекта

/**
 * Получение данных ----------------
 */
// Разделы для списка
const { data: sections } = await useCustomFetch(`team/section/sections`, {
  query: { team_id: teamController.activeTeamId },
});

/**
 * Хуки ----------------
 */
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
  .select {
    margin-bottom: 25px;
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

.warning {
  padding: 20px 100px;
}
</style>
