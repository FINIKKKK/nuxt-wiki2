<template>
  <NuxtLayout name="main" title="Мои работы">
    <Item
      v-for="article in articles"
      :key="article.id"
      :data="article"
      place="my"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticle } from '~/utils/types/article';

/**
 * Получение данных ----------------
 */
// Мои статьи
const { data: articles } = await useCustomFetch<TArticle[]>(`account/articles`);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
