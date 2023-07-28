<template>
  <NuxtLayout name="create" type="section" :isEdit="true"></NuxtLayout>
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
