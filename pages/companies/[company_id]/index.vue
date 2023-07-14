<template>
  <NuxtLayout name="main" :title="$t.title" :nav="nav"></NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTranslate } from '~/hooks/useTranslate';

/**
 * Переменные ----------------
 */
const route = useRoute();
const $t = await useTranslate('activity');
const nav = [{ label: $t.title, link: route.path }];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
