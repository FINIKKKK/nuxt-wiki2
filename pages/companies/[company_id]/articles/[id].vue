<template>
  <NuxtLayout
    name="elem"
    type="article"
    :data="data.article"
    :properties="data.properties"
  >
    <!-- Вкладки -->
    <ElemPageTabs :tabs="data.article.tabs" />

    <!-- Комментарии -->
    <Comments />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/SectionContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticleData } from '~/utils/types/article';
import { TSectionData } from '~/utils/types/secton';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const teamController = useTeamStore(); // Хранилище активной команды
const sectionsController = useSectionsStore(); // Хранилище разделов

/**
 * Получение данных ----------------
 */
// Данные раздела
const { data } = await useCustomFetch<TArticleData>(`team/article`, {
  query: {
    team_id: teamController.activeTeamId,
    article_id: route.params.id,
  },
});
sectionsController.setIsArticle(true);
if (!sectionsController.section) {
  // Получаем данные раздела
  const { data: section } = await useCustomFetch<TSectionData>(`team/section`, {
    query: {
      team_id: teamController.activeTeamId,
      section_id: data.value.article.section.id,
    },
  });
  // Сохраняем в хранилище
  sectionsController.setSection(section.value.section);
  sectionsController.setBreadCrumbs(section.value.section.breadcrumbs);
}
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
