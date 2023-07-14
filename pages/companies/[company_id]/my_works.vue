<template>
  <NuxtLayout name="main" :title="$t.home.my" :nav="nav">
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
import { useTranslate } from '~/hooks/useTranslate';

/**
 * Переменные ----------------
 */
const route = useRoute();
const $t = await useTranslate('sidebar');
const nav = [{ label: $t.home.my, link: route.path }];

/**
 * Получение данных ----------------
 */
// Мои статьи
const { data: articles } = await useCustomFetch<TArticle[]>(`account/articles`);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
