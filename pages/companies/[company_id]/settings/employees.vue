<template>
  <NuxtLayout name="main" title="Пользователи" :nav="nav">
    <!-- Поиск и кнопка добавления новых пользователей -->
    <EmployeesPageField />

    <!-- Таблица соотрудников -->
    <EmployeesPageTable />

    <EmployeesPageRoles :active="employeesController.isOpenRoles" />

  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useEmployeesStore } from '~/stores/EmployeesController';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const employeesController = useEmployeesStore();
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
