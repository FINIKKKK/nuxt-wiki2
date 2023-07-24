<template>
  <NuxtLayout name="create" type="article" :isEdit="true">
    <!-- Табы -->
    <CreatePageTabs />

    <!-- Тэги -->
    <PopupsTags
      :isOpen="createElemController.isOpenTags"
      @close="createElemController.closeTags()"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCreateElemStore } from '~/stores/CreateElemController';
import { TArticleEdit, TTabParse } from '~/utils/types/article';
import { useSectionsStore } from '~/stores/SectionContoller';

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const createElemController = useCreateElemStore();
const sectionsController = useSectionsStore();
const $t = await useTranslate('data');

/**
 * Получение данных ----------------
 */
// Данные статьи
const { data: article } = await useCustomFetch<TArticleEdit>(
  `team/article/edit`,
  {
    query: {
      team_id: teamController.activeTeamId,
      article_id: route.params.id,
    },
  },
);
console.log(article);

/**
 * Вычисляемые значения ----------------
 */
// Значение селекта
const section =
  sectionsController.sections?.find(
    (obj) => obj.id === article.article.section_id,
  ) || null;
// Значение вкладок
const tabs = await computed(() => {
  return article.article.tabs.map((obj: TTabParse) => ({
    name: obj.name,
    content: JSON.parse(obj.content),
  }));
});
// Сохраняем данные в хранилище
createElemController.setTitle(article.article.name);
createElemController.setSelect(
  section
    ? {
        value: section.id,
        label: section.name,
      }
    : null,
);
createElemController.setTabs(tabs.value);
createElemController.setTags(article.article.tags);
createElemController.setAbilities(
  article.abilities.users.map((obj) => ({
    user: obj,
    permission: {
      value: obj.permission.level,
      label: $t.access[accessArr.find((access) => access.value === obj.permission.level)
        ?.label],
    },
  })),
);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
