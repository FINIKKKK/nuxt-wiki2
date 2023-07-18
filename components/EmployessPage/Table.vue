<template>
  <table class="table">
    <!-- THead -->
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

    <!-- TBody -->
    <tbody>
    <!-- Загрузка -->
    <LoadingTableItem
        :count="7"
        v-for="(item, index) in Array(10)"
        :key="index"
        v-if="requestController.loading[url]"
    />

    <template v-else>
      <!-- Приглашения -->
      <EmployessPageItem
          v-for="employee in employees.invites"
          :key="employee.id"
          :data="employee"
          type="invite"
          @removeFromInvites="removeFromInvites"
      />
      <!-- Соотрудники -->
      <EmployessPageItem
          v-for="employee in employees.employees"
          :key="employee.id"
          :data="employee"
          @removeFromTeam="removeFromTeam"
      />
    </template>
    </tbody>
  </table>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import {useCustomFetch} from '~/hooks/useCustomFetch';
import {TEmployees} from '~/utils/types/team';
import {useRequestStore} from '~/stores/RequestController';
import {useTeamStore} from '~/stores/TeamContoller';

/**
 * Переменные ----------------
 */
const url = 'team/employees';
const requestController = useRequestStore();
const teamController = useTeamStore();

/**
 * Получение данных ----------------
 */
const {data: employees} = await useCustomFetch<TEmployees>(url, {
  query: {team_id: teamController.activeTeamId},
});
console.log(employees.value);

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

<style lang="scss" scoped></style>
