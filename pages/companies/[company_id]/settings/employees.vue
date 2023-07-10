<template>
  <NuxtLayout name="main" title="Пользователи" :nav="nav">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя и фамилия</th>
          <th>E-mail</th>
          <th>Последняя активность</th>
          <th>Статус</th>
          <th>Уровень доступа</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <EmployessPageItem
          v-for="employee in employees.invites"
          :key="employee.id"
          :data="employee"
          type="invite"
          @removeFromInvites="removeFromInvites"
        />
        <EmployessPageItem
          v-for="employee in employees.employees"
          :key="employee.id"
          :data="employee"
          @removeFromTeam="removeFromTeam"
        />
      </tbody>
    </table>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TEmployees } from '~/utils/types/team';

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

/**
 * Получение данных ----------------
 */
const { data: employees } = await useCustomFetch<TEmployees>(`team/employees`, {
  query: { team_id: teamController.activeTeamId },
});

/**
 * Методы ----------------
 */
// Удалить из списка (событие)
const removeFromTeam = (id: number) => {
  employees.value.employees = employees.value.employees.filter(
    (obj) => obj.id !== id,
  );
};
// Удалить из приглашенных (событие)
const removeFromInvites = (id: number) => {
  employees.value.invites = employees.value.invites.filter(
    (obj) => obj.id !== id,
  );
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.table {
}
</style>
