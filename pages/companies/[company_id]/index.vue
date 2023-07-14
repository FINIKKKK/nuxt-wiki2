<template>
  <NuxtLayout name="main" :title="$t.home.activity" :nav="nav"></NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTranslate } from '~/hooks/useTranslate';

/**
 * Переменные ----------------
 */
const route = useRoute();
const $t = await useTranslate('sidebar');
const nav = [{ label: $t.home.activity, link: route.path }];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
