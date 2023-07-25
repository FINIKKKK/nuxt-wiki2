<template>
  <!-- Табы -->
  <CreatePageTabs />

  <!-- Тэги -->
  <PopupTags
    :isOpen="createElemController.isOpenTags"
    @close="createElemController.closeTags()"
  />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCreateElemStore } from '~/stores/CreateElemController';
import { useSectionsStore } from '~/stores/SectionContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticleEdit, TTabParse } from '~/utils/types/article';

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

/**
 * Вычисляемое ----------------
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
createElemController.setTitle(article.article.name); // Заголовок
// Селект
createElemController.setSelect(
  section
    ? {
        value: section.id,
        label: section.name,
      }
    : null,
);
// Вкладки
createElemController.setTabs(tabs.value);
// Тэги
createElemController.setTags(article.article.tags);
// Значение доступа
createElemController.setAbilities(
  article.abilities.users.map((obj) => ({
    user: obj,
    permission: {
      value: obj.permission.level,
      label:
        $t.access[
          accessArr.find((access) => access.value === obj.permission.level)
            ?.label
        ],
    },
  })),
);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
