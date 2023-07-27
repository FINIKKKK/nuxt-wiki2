<template>
  <NuxtLayout name="main" :nav="nav">
    <!-- Отображение ошибок -->
    <UIWarning
      v-if="settingsController.errors?.length || settingsController.message"
      :errors="settingsController.errors"
      :message="settingsController.message"
      class="warning-m"
    />

    <!-- Форма изменения фанных компании -->
    <SettingsPageTeamForm v-if="teamController.isOwner" />

    <!-- Форма изменения настроек -->
    <SettingsPageSettingsForm />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useSettingsStore } from '~/stores/SettingsController';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Переменные ----------------
 */
const settingsController = useSettingsStore();
const teamController = useTeamStore();
const route = useRoute();
const $t = await useTranslate('settings_general');
const nav = [{ label: $t.title, link: route.path }];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
