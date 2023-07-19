<template>
  <NuxtLayout name="main" :title='$t.title' :nav="nav">
    <!-- Warning -->
    <UIWarning
      v-if="employeesController.successMessage"
      :message="employeesController.successMessage"
      class="warning"
    />

    <!-- Поиск и кнопка добавления новых пользователей -->
    <EmployeesPageField />

    <!-- Таблица соотрудников -->
    <EmployeesPageTable />

    <!-- Попап редактирования роли -->
    <EmployeesPageRoles :active="employeesController.isOpenRoles" />

    <!-- Попап добавления новых пользователей -->
    <EmployeesPageAddUsers :active="employeesController.isOpenAddUsers" />
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
const $t = await useTranslate('employees');
const nav = [
  { label: $t.settings, link: `${teamController.activeTeamSlug}/settings` },
  {
    label: $t.title,
    link: `${teamController.activeTeamSlug}/settings/employees`,
  },
];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.warning {
  margin: -15px -55px;
  margin-bottom: 40px;
}
</style>
