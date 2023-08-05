<template>
  <PagesFormRequisite type="edit" />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Мета ----------------
 */
definePageMeta({
  middleware: ['owner-access', 'requisites'],
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
