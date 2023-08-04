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
      <tr
        class="item"
        v-for="(item, index) in Array(10)"
        v-if="requestController.loading[url]"
        :key="index"
      >
        <th v-for="(item, index) in Array(4)" :key="index">
          <p class="loading">0</p>
        </th>
      </tr>

      <template v-else>
        <!-- Соотрудники -->
        <GroupPageItem
          v-for="user in groupController.usersSearch"
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
