<template>
  <!-- Разделы -->
  <div class="items">
    <h3 class="title">{{ sectionsController.section?.name }}</h3>
    <ul>
      <template
        v-for="section in sectionsController.section?.child"
        :key="section.id"
      >
        <SidebarItem :data="section" type="section" />
      </template>
    </ul>
  </div>

  <!-- Посты -->
  <div class="items" v-if="sectionsController.section?.items?.length">
    <h3>{{ $t.home.articles }}</h3>
    <ul>
      <template
        v-for="article in sectionsController.section?.items"
        :key="article.id"
      >
        <SidebarItem :data="article" type="article" />
      </template>
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useSectionsStore } from '~/stores/SectionContoller';
import { useTranslate } from '~/hooks/useTranslate';

/**
 * Переменные ----------------
 */
const sectionsController = useSectionsStore();
const $t = await useTranslate('sidebar');
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
</style>
