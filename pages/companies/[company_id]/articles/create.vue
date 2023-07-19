<template>
  <NuxtLayout name="create" type="article">
    <!-- Табы -->
    <CreatePageTabs />

    <!-- Тэги -->
    <PopupsTags :isOpen="createElemController.isOpenTags" />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCreateElemStore } from '~/stores/CreateElemController';

const createElemController = useCreateElemStore();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
