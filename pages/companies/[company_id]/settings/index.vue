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
    <SettingsPageTeamForm />

    <!-- Форма изменения настроек -->
    <SettingsPageSettingsForm />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useSettingsStore } from '~/stores/SettingsController';

/**
 * Переменные ----------------
 */
const settingsController = useSettingsStore();
const route = useRoute();
const $t = await useTranslate('settings_general');
const nav = [{ label: $t.title, link: route.path }];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
