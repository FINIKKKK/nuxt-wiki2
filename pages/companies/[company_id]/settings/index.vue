<template>
  <NuxtLayout name="main">
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
 * Системные переменные ----------------
 */
const settingsController = useSettingsStore(); // Хранилище страницы настроек
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
