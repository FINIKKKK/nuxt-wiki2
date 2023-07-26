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
            v-for="employee in employees.invites"
            :key="employee.id"
            :data="employee"
            type="invite"
            @removeFromInvites="removeFromInvites"
          />
          <!-- Соотрудники -->
          <EmployeesPageItem
            v-for="employee in employees.employees"
            :key="employee.id"
            :data="employee"
            @removeFromTeam="removeFromTeam"
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
import { TNotifications } from '~/utils/types/notice';

/**
 * Переменные ----------------
 */
const url = 'team/employees';
const requestController = useRequestStore();
const teamController = useTeamStore();
const employeesList = ref([]);
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
employeesList.value = [employees.invites, employees.employees];

/**
 * Методы ----------------
 */
// Удалить из списка (событие)
const removeFromTeam = (id: number) => {
  employees.employees = employees.employees.filter(
    (obj: TUser) => obj.id !== id,
  );
};

// Удалить из приглашенных (событие)
const removeFromInvites = (id: number) => {
  employees.invites = employees.invites.filter((obj: TUser) => obj.id !== id);
};

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
