<template>
  <!-- Табы -->
  <CreatePageTabs />

  <!-- Тэги -->
  <PopupTags
    :isOpen="createElemController.isOpenTags"
    @close="createElemController.closeTags()"
  />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCreateElemStore } from '~/stores/CreateElemController';

/**
 * Переменные ----------------
 */
const createElemController = useCreateElemStore();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
