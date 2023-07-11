<template>
  <NuxtLayout name="main" :nav="nav">
    <!-- Отображение ошибок -->
    <UIWarning
      v-if="settingsController.errors?.length || settingsController.message"
      :errors="settingsController.errors"
      :messages="settingsController.message"
    />

    <!-- Форма изменения фанных компаниии -->
    <SettingsPageTeamForm />
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
const nav = [{ label: 'Настройки', link: route.path }];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
