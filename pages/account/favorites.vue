<template>
  <NuxtLayout name="main" :title="$t.profile.favorites" :nav="nav">
    <ul class="items">
      <Item
        v-for="item in favorites.internal[0]"
        :key="item.id"
        :data="item.article"
        type="article"
        place="favorite"
        @removeFromFavorites="removeFromFavorites"
      />
    </ul>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TFavoriteData } from '~/utils/types/favorites';
import { useTranslate } from '~/hooks/useTranslate';

/**
 * Переменные ----------------
 */
const route = useRoute();
const $t = await useTranslate('sidebar');
const nav = [
  { label: $t.profile.title, link: `/account` },
  { label: $t.profile.favorites, link: route.path },
];

/**
 * Получение данных ----------------
 */
// Список избранного
const { data: favorites } = await useCustomFetch<TFavoriteData>(
  `account/bookmarks`,
);

/**
 * Методы ----------------
 */
// Удалить из списка (событие)
const removeFromFavorites = (id: number) => {
  favorites.internal[0] = favorites.internal[0].filter(
    (obj) => obj.article.id !== id,
  );
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
