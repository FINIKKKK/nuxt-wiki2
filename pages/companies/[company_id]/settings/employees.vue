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
        />
        <EmployessPageItem
          v-for="employee in employees.employees"
          :key="employee.id"
          :data="employee"
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
console.log(employees.value);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.table {
}


</style>
