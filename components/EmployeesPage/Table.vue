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
        <LoadingTableItem
          :count="7"
          v-for="(item, index) in Array(10)"
          :key="index"
          v-if="requestController.loading[url]"
        />

        <template v-else>
          <!-- Приглашения -->
          <EmployeesPageItem
            v-for="employee in teamController.employees?.invites"
            :key="employee.id"
            :data="employee"
            type="invite"
            @removeFromInvites="teamController.removeFromInvites(employee.id)"
          />
          <!-- Соотрудники -->
          <EmployeesPageItem
            v-for="employee in teamController.employees?.employees"
            :key="employee.id"
            :data="employee"
            @removeFromTeam="teamController.removeFromTeam(employee.id)"
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
import { TUser } from '~/utils/types/account';

/**
 * Переменные ----------------
 */
const url = 'team/employees';
const requestController = useRequestStore();
const teamController = useTeamStore();
const employeesList = ref<TEmployees | null>(null);
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
        offset: employeesList.value.length,
        order_by: 'created_at',
        order_sort: 'DESC',
      },
    });

    if (!newEmployees.invites.length && !newEmployees.employees.length) {
      isEnd = true;
    }

    employees.value = [
      ...employeesList.value,
      ...newEmployees.invites,
      ...newEmployees.employees,
    ];
    teamController.addEmployees(newEmployees);
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
