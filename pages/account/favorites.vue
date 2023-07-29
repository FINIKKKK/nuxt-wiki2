<template>
  <NuxtLayout name="main" :title="$t.favorite.title" :nav="nav">
    <!-- Loading -->
    <div
      class="item-loading loading"
      v-for="item in Array(15)"
      v-if="requestController.loading[url]"
    ></div>

    <!-- Сообщение, если нету элементов -->
    <p v-if="!favoritesList?.length">{{ $t.favorite.empty }}</p>

    <!-- Элементы -->
    <Item
      v-for="item in favoritesList"
      :key="item.id"
      :data="item.article"
      type="article"
      place="favorite"
      @removeFromFavorites="removeFromFavorites"
    />

    <div v-observe="() => getFavorites()"></div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TFavorite, TFavoriteData } from '~/utils/types/favorites';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Переменные ----------------
 */
const route = useRoute();
const $t = await useTranslate('items');
const nav = [
  { label: $t.favorite.nav1, link: `/account` },
  { label: $t.favorite.title, link: route.path },
];
const url = `account/bookmarks`;
const favoritesList = ref<TFavorite[]>([]);
const requestController = useRequestStore();

/**
 * Получение данных ----------------
 */
// Список избранного
const { data: favorites } = await useCustomFetch<TFavoriteData>(url, {
  query: { limit: 15, offset: 0 },
});
favoritesList.value = favorites.internal[0];

/**
 * Методы ----------------
 */
// Удалить из списка (событие)
const removeFromFavorites = (id: number) => {
  favorites.internal[0] = favorites.internal[0].filter(
    (obj: TFavorite) => obj.article.id !== id,
  );
};

// Получение новых избранных статей
let isEnd = true; // Поменять на false, если на бэкенде есть пагинация ###################
const getFavorites = async () => {
  if (!isEnd) {
    const { data: newFavorites } = await useCustomFetch<TFavoriteData>(url, {
      query: { limit: 15, offset: favoritesList.value.length },
    });

    if (!newFavorites?.internal[0]?.length) {
      isEnd = true;
    }

    favoritesList.value = [...favoritesList.value, ...newFavorites.internal[0]];
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
