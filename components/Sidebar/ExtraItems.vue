<template>
  <!-- Разделы -->
  <div class="items">
    <h3 class="title">{{ elemController.section?.name }}</h3>
    <ul>
<!--      <div-->
<!--        class="loading"-->
<!--        v-for="(item, index) in Array(5)"-->
<!--        :key="index"-->
<!--        v-if="isLoading"-->
<!--      ></div>-->
      <template
        v-for="section in elemController.section?.child"
        :key="section.id"
      >
        <SidebarItem :data="section" type="section" />
      </template>
    </ul>
  </div>

  <!-- Посты -->
<!--  <div class="items" v-if="isLoading">-->
<!--    <h3>{{ $t.home.articles }}</h3>-->
<!--    <div class="loading" v-for="(item, index) in Array(10)" :key="index"></div>-->
<!--  </div>-->
  <div class="items" v-if="articles?.length">
    <h3>{{ $t.home.articles }}</h3>
    <ul>
      <template v-for="article in articles" :key="article.id">
        <SidebarItem :data="article" type="article" />
      </template>
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useElemStore } from '~/stores/ElemController';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Переменные ----------------
 */
const elemController = useElemStore();
const requestController = useRequestStore();
const $t = await useTranslate('sidebar');
const articles = elemController.section?.items.filter(
  (obj) => obj.status_id === 3,
);

/**
 * Методы ----------------
 */
// Загрузка
const isLoading = computed(() => {
  return (
    requestController.loading['team/section/sections'] ||
    requestController.loading['team/section'] ||
    requestController.loading['team/article']
  );
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.items {
  margin-bottom: 49px;
  .title {
    color: $black;
    text-transform: none;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h3 {
    color: $gray;
    margin-bottom: 10px;
  }
}

.loading {
  width: 100%;
  height: 30px;
  border-radius: 3px;
  overflow: hidden;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
