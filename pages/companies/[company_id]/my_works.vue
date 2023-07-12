<template>
  <NuxtLayout name="main" title="Мои работы" :nav="nav">
    <Item
      v-for="article in articles"
      :key="article.id"
      :data="article"
      type="article"
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
 * Переменные ----------------
 */
const route = useRoute();
const nav = [{ label: 'Мои работы', link: route.path }];

/**
 * Получение данных ----------------
 */
// Мои статьи
const { data: articles } = await useCustomFetch<TArticle[]>(`account/articles`);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
