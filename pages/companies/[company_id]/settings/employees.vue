<template>
  <NuxtLayout name="main" title="Пользователи" :nav="nav">
    <!-- Поиск и кнопка добавления новых пользователей -->
    <EmployessPageField />

    <!-- Таблица соотрудников -->
    <EmployessPageTable />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const nav = [
  { label: 'Настройки', link: `${teamController.activeTeamSlug}/settings` },
  {
    label: 'Пользователи',
    link: `${teamController.activeTeamSlug}/settings/employees`,
  },
];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
