<template>
  <NuxtLayout name="main" :title="$t.my.title" :nav="nav">
    <!-- Loading -->
    <div
      class="item-loading loading"
      v-for="item in Array(15)"
      v-if="requestController.loading[url]"
    ></div>

    <!-- Сообщение, если нету элементов -->
    <p v-if="!articleList?.length">{{ $t.my.empty }}</p>

    <!-- Элементы -->
    <Item
      v-for="article in articleList"
      :key="article.id"
      :data="article"
      type="article"
      place="my"
    />

    <div v-observe="() => getArticles()"></div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticle } from '~/utils/types/article';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Переменные ----------------
 */
const route = useRoute();
const requestController = useRequestStore();
const $t = await useTranslate('items');
const nav = [{ label: $t.my.title, link: route.path }];
const url = 'account/articles';
const articleList = ref<TArticle[]>([]);

/**
 * Получение данных ----------------
 */
// Мои статьи
const { data: articles } = await useCustomFetch<TArticle[]>(url, {
  query: { limit: 15, offset: 0 },
});
articleList.value = articles;

/**
 * Методы ----------------
 */
// Получение новых статей
let isEnd = true; // Поменять на false, если на бэкенде есть пагинация ###################
const getArticles = async () => {
  if (!isEnd) {
    const { data: newArticles } = await useCustomFetch<TArticle[]>(url, {
      query: { limit: 15, offset: articleList.value.length },
    });

    if (!newArticles.length) {
      isEnd = true;
    }

    articleList.value = [...articleList.value, ...newArticles];
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
