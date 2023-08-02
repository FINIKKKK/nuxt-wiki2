<template>
  <NuxtLayout name="main" :nav="nav" :title="$t.title"></NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Мета ----------------
 */
definePageMeta({
  middleware: 'owner-access',
});

/**
 * Переменные ----------------
 */
const $t = await useTranslate('invoices');
const teamController = useTeamStore();
const route = useRoute();
const nav = [
  { label: $t.nav.billing, link: `${teamController.activeTeamSlug}/billing` },
  {
    label: $t.title,
    link: route.fullPath,
  },
];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
