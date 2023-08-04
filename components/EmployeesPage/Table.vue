<template>
  <div class="table-wrapper">
    <table class="table">
      <!-- THead -->
      <thead>
        <tr>
          <th>{{ $t.table.id }}</th>
          <th>{{ $t.table.name }}</th>
          <th>{{ $t.table.email }}</th>
          <th>{{ $t.table.last_activity }}</th>
          <th>{{ $t.table.status }}</th>
          <th>{{ $t.table.access }}</th>
          <th></th>
        </tr>
      </thead>

      <!-- TBody -->
      <tbody>
        <!-- Загрузка -->
        <tr
          class="item"
          v-for="(item, index) in Array(10)"
          v-if="requestController.loading[url]"
          :key="index"
        >
          <th v-for="(item, index) in Array(6)" :key="index">
            <p class="loading">0</p>
          </th>
        </tr>

        <template v-else>
          <!-- Приглашения -->
          <EmployeesPageItem
            v-for="employee in employeesController.employeesSearch?.invites"
            :key="employee.id"
            :data="employee"
            type="invite"
          />
          <!-- Соотрудники -->
          <EmployeesPageItem
            v-for="employee in employeesController.employeesSearch?.employees"
            :key="employee.id"
            :data="employee"
          />
        </template>
      </tbody>
    </table>

    <div v-observe="() => getEmployees()"></div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TEmployees } from '~/utils/types/team';
import { useRequestStore } from '~/stores/RequestController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useEmployeesStore } from '~/stores/EmployeesController';

/**
 * Переменные ----------------
 */
const url = 'team/employees';
const requestController = useRequestStore();
const teamController = useTeamStore();
const employeesController = useEmployeesStore();
const $t = await useTranslate('employees');

/**
 * Получение данных ----------------
 */
const { data: employees } = await useCustomFetch<TEmployees>(url, {
  query: {
    team_id: teamController.activeTeamId,
    limit: 15,
    offset: 0,
    order_by: 'created_at',
    order_sort: 'DESC',
  },
});
teamController.setEmployees(employees);
// employeesController.changeUsersList();

/**
 * Методы ----------------
 */
// Получить новых работников
let isEnd = false;
const getEmployees = async () => {
  if (!isEnd) {
    const { data: newEmployees } = await useCustomFetch<TEmployees>(url, {
      query: {
        team_id: teamController.activeTeamId,
        limit: 15,
        offset: teamController.employees.employees.length,
        order_by: 'created_at',
        order_sort: 'DESC',
      },
    });

    if (!newEmployees.invites.length && !newEmployees.employees.length) {
      isEnd = true;
    }

    teamController.addEmployees(newEmployees);
    employeesController.changeUsersList();
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.table-wrapper {
  padding-bottom: 85px;
}
</style>
