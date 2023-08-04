<template>
  <NuxtLayout name="main" :title="$t.title" :nav="nav">
    <!-- Поиск и кнопка добавления новых пользователей -->
    <EmployeesPageField />

    <!-- Таблица соотрудников -->
    <EmployeesPageTable />

    <!-- Попап редактирования роли -->
    <PopupRoles
      :isOpen="employeesController.isOpenRoles"
      @close="employeesController.closeRoles()"
    />

    <!-- Попап добавления новых пользователей -->
    <PopupAddUsers
      :isOpen="employeesController.isOpenAddUsers"
      @close="employeesController.closeAddUsers()"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useEmployeesStore } from '~/stores/EmployeesController';

/**
 * Мета ----------------
 */
definePageMeta({
  middleware: 'owner-access',
});

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
