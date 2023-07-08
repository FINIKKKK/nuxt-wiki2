<template>
  <div class="main">
    <!--------------------------------------
      Элементы управления
    ---------------------------------------->
    <CreatePageControls :type="props.type" :isEdit="props.isEdit" />

    <!--------------------------------------
      Ошибки
    ---------------------------------------->
    <UIWarning
      v-if="createElemController.errors.length"
      :errors="createElemController.errors"
      class="warning"
    />

    <!--------------------------------------
      Форма создания
    ---------------------------------------->
    <div class="form">
      <!-- Селект элемента -->
      <UISelect
        :options="selections"
        v-model="createElemController.select"
        class="select"
      />

      <!-- Заголовок элемента -->
      <div class="input">
        <input
          v-model="createElemController.title"
          class="title"
          type="text"
          placeholder="Заголовок статьи"
        />
      </div>

      <!-- Слот -->
      <slot />

      <!-- Компонент редактирования доступа -->
      <CreatePageAccess />
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useCreateElemStore } from '~/stores/CreateElemController';
import { TSection } from '~/utils/types/secton';
import { useSectionsStore } from '~/stores/SectionContoller';
import { TSelect } from '~/utils/types/base';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type: 'article' | 'section';
  isEdit?: boolean;
  isDraft?: boolean;
}>();

/**
 * Системные переменные ----------------
 */
const router = useRouter(); // Роутер
const teamController = useTeamStore(); // Хранилище активной компании
const createElemController = useCreateElemStore(); // Хранилище страницы создания
const sectionsController = useSectionsStore(); // Хранилище разделов

/**
 * Получение данных ----------------
 */
// Разделы для списка
const { data: sections } = await useCustomFetch<TSection[]>(
  `team/section/sections`,
  {
    query: { team_id: teamController.activeTeamId },
  },
);
// Сохраняем в хранилище
sectionsController.setSections(sections.value);

/**
 * Вычисляемые значения ----------------
 */
// Конвертировать массив разделов
const selections = computed(() => {
  if (props.type === 'article') {
    function transformSections(sections: TSection[]) {
      const result: TSelect[] = [];
      sections.forEach((section) => {
        result.push({
          value: section.id,
          label: section.name,
        });
        if (section.children.length > 0) {
          const childrenResult = transformSections(section.children);
          result.push(...childrenResult);
        }
      });
      return result;
    }

    return transformSections(sections.value);
  } else {
    return sections.value.map((obj) => ({
      value: obj.id,
      label: obj.name,
    }));
  }
});
// Получаем сохраненые данные и устанавливаем их÷
onMounted(() => {
  const savedArticle = localStorage.getItem('article');
  const parsedSavedArticle = savedArticle && JSON.parse(savedArticle);
  if (
    props.type === 'article' &&
    parsedSavedArticle &&
    !props.isEdit &&
    !props.isDraft
  ) {
    createElemController.setTitle(parsedSavedArticle.name);
    parsedSavedArticle.select &&
      createElemController.setSelect(parsedSavedArticle.select);
    parsedSavedArticle.tabs &&
      createElemController.setTabs(parsedSavedArticle.tabs);
  }
});

/**
 * Хуки ----------------
 */
// Предупреждение прежде чем покинуть страницу
onBeforeRouteLeave((to, from, next) => {
  if (to.path.includes('/articles/') || to.path.includes('/sections/')) {
    next();
    createElemController.setTitle('');
    createElemController.setSelect(null);
    createElemController.setTabs([]);
  } else {
    if (confirm('Вы уверены, что хотите покинуть эту страницу?')) {
      next();
      createElemController.setTitle('');
      createElemController.setSelect(null);
      createElemController.setTabs([]);
    } else {
      next(false);
    }
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.main {
  margin-top: 80px;
}

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
