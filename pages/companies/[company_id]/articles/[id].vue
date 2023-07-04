<template>
  <NuxtLayout name="elem" type="article" :data="data.article">

  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/SectionContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import {TArticle, TArticleData} from '~/utils/types/article';

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
console.log(data.value);
// Сохраняем в хранилище
// sectionsController.setSection(data.value.article.section);
// sectionsController.setParentId(data.value.section.parent_id);
// if (!data.value.section.parent_id) {
//   sectionsController.setIsChild(false);
// } else {
//   sectionsController.setIsChild(true);
// }
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
