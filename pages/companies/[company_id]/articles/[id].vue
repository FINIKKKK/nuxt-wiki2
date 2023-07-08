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
    <Comments :comments="data.article.comments" />
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
import { useCommentsStore } from '~/stores/CommentsController';

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const sectionsController = useSectionsStore();
const commentsController = useCommentsStore();

/**
 * Получение данных ----------------
 */
const { data } = await useCustomFetch<TArticleData>(`team/article`, {
  query: {
    team_id: teamController.activeTeamId,
    article_id: route.params.id,
  },
});
// Сохраняем комментарии в хранилище
commentsController.setComments(data.value.article.comments);

// Получаем разделы
if (!sectionsController.section) {
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
