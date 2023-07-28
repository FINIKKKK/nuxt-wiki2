<template>
  <NuxtLayout name="create" type="article" :isEdit="true">
    <PagesEdit />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Мета ----------------
 */
definePageMeta({
  middleware: 'access-edit',
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
