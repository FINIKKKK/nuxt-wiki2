<template>
  <NuxtLayout name="create" type="article" :isEdit="true">
    <!-- Табы -->
    <CreatePageTabs />

    <!-- Тэги -->
    <CreatePageTags />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCreateElemStore } from '~/stores/CreateElemController';
import { TArticleEdit } from '~/utils/types/article';
import { useSectionsStore } from '~/stores/SectionContoller';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const teamController = useTeamStore(); // Хранилище активной компании
const createElemController = useCreateElemStore(); // Хранилище страницы создания
const sectionsController = useSectionsStore(); // Хранилище разделов

/**
 * Получение данных ----------------
 */
// Данные статьи
const { data } = await useCustomFetch<TArticleEdit>(`team/article/edit`, {
  query: { team_id: teamController.activeTeamId, article_id: route.params.id },
});

/**
 * Вычисляемые значения ----------------
 */
// Значение селекта
const section = sectionsController.sections.find(
    (obj) => obj.id === data.value.article.section_id,
) || {};
// Значение вкладок
const tabs = await computed(() => {
  return data.value.article.tabs.map((obj) => ({
    name: obj.name,
    content: JSON.parse(obj.content),
  }));
});
// Сохраняем данные в хранилище
createElemController.setTitle(data.value.article.name);
createElemController.setSelect({
  value: section.id,
  label: section.name,
});
createElemController.setTabs(tabs.value);
createElemController.setTags(data.value.article.tags);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
