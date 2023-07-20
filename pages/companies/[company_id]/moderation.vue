<template>
  <NuxtLayout name="main" :title="$t.home.moderation" :nav="nav">
    <Item
      v-for="article in articles"
      :key="article.id"
      :data="article"
      place="moderation"
      @removeFromModeration="removeFromModeration"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticle } from '~/utils/types/article';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Системные переменные ----------------
 */
const teamController = useTeamStore();
const route = useRoute();
const $t = await useTranslate('sidebar');
const nav = [{ label: $t.home.moderation, link: route.path }];

/**
 * Получение данных ----------------
 */
// Статьи на модерации
let { data: articles } = await useCustomFetch<TArticle[]>(`team/moderation`, {
  query: { team_id: teamController.activeTeamId },
});
console.log(articles);

/**
 * Методы ----------------
 */
// Удалить элемент из списка
const removeFromModeration = (id: number) => {
  articles = articles.filter((obj: TArticle) => obj.id !== id);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
