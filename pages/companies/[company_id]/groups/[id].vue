<template>
  <NuxtLayout name="main" :nav="nav">

  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import {useTeamStore} from "~/stores/TeamContoller";

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const route = useRoute();
const router = useRouter();
const inputValue = ref('');
const $t = await useTranslate('groups');
const nav = [
  {label: $t.title, link: `${teamController.activeTeamSlug}/settings/groups`},
  {label: $t.index.btn, link: route.fullPath},
];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>

</style>
