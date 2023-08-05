<template>
  <NuxtLayout name="main" :nav="nav">
    <NuxtLink
      class="btn"
      :to="`${teamController.activeTeamSlug}/requisites/edit`"
    >
      {{ $t?.edit }}
    </NuxtLink>

    <div class="requisites">
      <h3>{{ $t.table.requisites }}</h3>
      <table>
        <tbody>
          <tr>
            <th>{{ $t.table.name }}</th>
            <th>{{ requisites.requisites?.name }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.bin }}</th>
            <th>{{ requisites.requisites?.BIN }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.bik }}</th>
            <th>{{ requisites.requisites?.BIK }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.account }}</th>
            <th>{{ requisites.requisites?.account }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.address }}</th>
            <th>{{ requisites.requisites?.address }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.person }}</th>
            <th>{{ userController.user?.fullname }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.email }}</th>
            <th>{{ userController.user?.email }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.phone }}</th>
            <th>{{ userController.user?.phone }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="requisites contact">
      <h3>{{ $t.table.contact }}</h3>
      <table>
        <tbody>
          <tr>
            <th>{{ $t.table.person }}</th>
            <th>{{ userController.user?.fullname }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.email }}</th>
            <th>{{ userController.user?.email }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.phone }}</th>
            <th>{{ userController.user?.phone }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useUserStore } from '~/stores/UserController';
import { TRequisites } from '~/utils/types/billing';

/**
 * Мета ----------------
 */
definePageMeta({
  middleware: 'owner-access',
});

/**
 * Переменные ----------------
 */
const $t = await useTranslate('requisites');
const teamController = useTeamStore();
const userController = useUserStore();
const route = useRoute();
const nav = [
  { label: $t.nav.billing, link: `${teamController.activeTeamSlug}/billing` },
  {
    label: $t.title,
    link: route.fullPath,
  },
];

/**
 * Получение данных ----------------
 */
// Данные реквизитов
const { data: requisites } = await useCustomFetch<TRequisites>(
  `billing/requisites`,
  {
    query: { team_id: teamController.activeTeamId },
  },
);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.btn {
  margin-bottom: 40px;
}
.requisites {
  &:not(:last-child) {
    margin-bottom: 80px;
  }
  h3 {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 24px;
  }
  table {
    text-align: left;
    th {
      padding: 0 75px 18px 0;
    }
    th:first-child {
      color: $gray;
    }
  }
}
</style>
