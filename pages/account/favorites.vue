<template>
  <NuxtLayout name="main" title="Мое избранное">
    <ul class="items">
      <Item
        v-for="item in favorites"
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
import { TFavorite, TFavoriteData } from '~/utils/types/favorites';

/**
 * Полльзовательские переменные ----------------
 */
const favorites = ref<TFavorite[]>([]); // Список избранного

/**
 * Получение данных ----------------
 */
// Список избранного
const { data } = await useCustomFetch<TFavoriteData>(`account/bookmarks`);
favorites.value = data.value.internal[0];

/**
 * Методы ----------------
 */
// Удалить из списка (событие)
const removeFromFavorites = (id: number) => {
  favorites.value = favorites.value.filter((obj) => obj.article.id !== id);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
