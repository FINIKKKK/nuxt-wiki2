<template>
  <table class="table">
    <!-- THead -->
    <thead>
      <tr>
        <th>{{ $t?.table?.id }}</th>
        <th>{{ $t?.table?.name }}</th>
        <th>{{ $t?.table?.email }}</th>
        <th>{{ $t?.table?.last_activity }}</th>
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
        <!-- Соотрудники -->
        <GroupPageItem
          v-for="user in groupController.users"
          :key="user.id"
          :data="user"
        />
      </template>
    </tbody>
  </table>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Table from '~/components/EmployeesPage/Table.vue';
import { useGroupStore } from '~/stores/GroupController';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Переменные ----------------
 */
const url = 'team/groups/get';
const $t = await useTranslate('groups');
const groupController = useGroupStore();
const requestController = useRequestStore();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
