<template>
  <NuxtLayout name="create2" type="article">
    <!-- Табы -->
    <CreatePageTabs v-model="tabs" />

    <!-- Тэги -->
    <CreatePageTags v-model="tags" />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TTab } from '~/utils/types/article';

const tabs = ref<TTab[]>([]);
const tags = ref<number[]>([]); //
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
