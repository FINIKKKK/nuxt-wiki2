<template>
  <NuxtLayout name="main" :title="$t.moder.title" :nav="nav">
    <!-- Loading -->
    <div
      class="item-loading loading"
      v-for="item in Array(15)"
      v-if="requestController.loading[url]"
    ></div>

    <!-- Сообщение, если нету элементов -->
    <p v-if="!articleList?.length">{{ $t?.moder.empty }}</p>

    <!-- Элементы -->
    <Item
      v-for="article in articleList"
      :key="article.id"
      :data="article"
      place="moderation"
      @removeFromModeration="removeFromModeration"
    />

    <div v-observe="() => getArticles()"></div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticle } from '~/utils/types/article';
import { useTeamStore } from '~/stores/TeamContoller';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Мета ----------------
 */
definePageMeta({
  middleware: 'moder-access',
});

/**
 * Системные переменные ----------------
 */
const teamController = useTeamStore();
const requestController = useRequestStore();
const route = useRoute();
const $t = await useTranslate('items');
const nav = [{ label: $t.moder.title, link: route.path }];
const url = 'team/moderation';
const articleList = ref<TArticle[]>([]);

/**
 * Получение данных ----------------
 */
// Статьи на модерации
const { data: articles } = await useCustomFetch<TArticle[]>(url, {
  query: { team_id: teamController.activeTeamId, limit: 15, offset: 0 },
});
articleList.value = articles;

/**
 * Методы ----------------
 */
// Удалить элемент из списка  (событие)
const removeFromModeration = (id: number) => {
  articleList.value = articles.filter((obj: TArticle) => obj.id !== id);
};

// Получение новых статей на модерации
let isEnd = true; // Поменять на false, если на бэкенде есть пагинация ###################
const getArticles = async () => {
  if (!isEnd) {
    const { data: newArticles } = await useCustomFetch<TArticle[]>(url, {
      query: {
        team_id: teamController.activeTeamId,
        limit: 15,
        offset: articleList.value.length,
      },
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
